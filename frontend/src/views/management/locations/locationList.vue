<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Location List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewLocation">Add New Location</button>
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
          initialSortBy: {field: 'location_id', type: 'asc'}
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
      LOCATIONTYPE_DATA: [],
      myAPI: `${config.api}/api/locations`,
      dataFields: [{
        label: 'id',
        field: 'location_id',
        type: 'number'
      },{
        label: 'name',
        field: 'location_name'
      },{
        label: 'type',
        field: 'locationTypeDesc'
      },{
        label: 'street',
        field: 'location_street'
      },{
        label: 'street2',
        field: 'location_street2'
      },{
        label: 'city',
        field: 'location_city'
      },{
        label: 'state',
        field: 'location_state'
      },{
        label: 'zip',
        field: 'location_zip'
      },{
        label: 'country',
        field: 'location_country'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/manage/locations/edit',
        params: {
          location_id: params.row.location_id
        }
      })
    },
    addNewLocation(){
      this.$router.push('/manage/locations/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/locations/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'locationType.locationType_description','locationTypeDesc'))
          console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){},
  },
  renameKey( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
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
