<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Contract List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewContract">Add New Contract List</button>
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
          initialSortBy: {field: 'contract_id', type: 'asc'}
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
      VENDORS_DATA: [],
      myAPI: `${config.api}/api/contracts`,
      dataFields: [{
        label: 'id',
        field: 'contract_id',
        type: 'number'
      },{
        label: 'name',
        field: 'contract_name'
      },{
        label: 'description',
        field: 'contract_description'
      },{
        label: 'vendorId',
        field: 'VendorName'
      }]
    };
  },
  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/manage/contracts/edit',
        params: {
          contract_id: params.row.contract_id
        }
      })
    },
    addNewContract(){
      this.$router.push('/manage/contracts/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/contracts/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          console.log(this.DB_DATA)
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'vendor.vendor_name','VendorName'))
          //needs to work on
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
