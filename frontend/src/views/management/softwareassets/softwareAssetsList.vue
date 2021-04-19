<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Software Asset List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewSoftwareAsset">Add New Software Asset</button>
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
          initialSortBy: {field: 'software_id', type: 'asc'}
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
      VENDOR_DATA: [],
      SOFTWARESTATUS_DATA: [],
      myAPI: `${config.api}/api/softwareAssets`,
      dataFields: [{
        label: 'id',
        field: 'software_id',
        type: 'number'
      },{
        label: 'name',
        field: 'software_name'
      },{
        label: 'description',
        field: 'software_description'
      },{
        label: 'softwareStatusId',
        field: 'softwareStatusDesc'
      },{
        label: 'vendorId',
        field: 'vendorName'
      },{
        label: 'purchase_date',
        field: 'purchase_date'
      },{
        label: 'notes',
        field: 'software_notes'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/manage/softwareassets/edit',
        params: {
          software_id: params.row.software_id
        }
      })
    },
    addNewSoftwareAsset(){
      this.$router.push('/manage/softwareassets/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/softwareAssets/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'softwareStatus.softwareStatus_description','softwareStatusDesc'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'vendor.vendor_name','vendorName'))
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
