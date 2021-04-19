<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">License Keys List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewLicenseKeys">Add New License Keys</button>
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'license_id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>
  </div>

</template>

<script>
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      USER_DATA: [],
      SOFTWAREASSETS_DATA: [],
      myAPI: `${config.api}/api/licenseKeys`,
      dataFields: [{
        label: 'id',
        field: 'license_id',
        type: 'number'
      },{
        label: 'software Name',
        field: 'softwareName'
      },{
        label: 'license key',
        field: 'license_key'
      },{
        label: 'Assigned User',
        field: 'users'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/manage/licensekeys/edit',
        params: {
          license_id: params.row.license_id
        }
      })
    },
    addNewLicenseKeys(){
      this.$router.push('/manage/licensekeys/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/licenseKeys/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          //console.log(JSON.stringify(this.DB_DATA))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'user.email','users'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'softwareAsset.software_name','softwareName'))
          //console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
