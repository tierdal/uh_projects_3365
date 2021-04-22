<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Asset List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAsset">Add New Asset</button>
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
          initialSortBy: {field: 'asset_id', type: 'asc'}
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
      myAPI: `${config.api}/api/assetList`,
      dataFields: [{
        label: 'id',
        field: 'asset_id',
        type: 'number'
      },{
        label: 'name',
        field: 'asset_name'
      },{
        label: 'serial number',
        field: 'serial_number'
      },{
        label: 'asset Status',
        field: 'assetStatus.assetStatus_name'
      },{
        label: 'asset Type',
        field: 'assetType.assetType_name'
      },{
        label: 'vendor Name',
        field: 'vendor.vendor_name'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/manage/hardwareassets/edit',
        params: {
          asset_id: params.row.asset_id
        }
      })
    },
    addNewAsset(){
      this.$router.push('/manage/hardwareassets/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/assetList/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding assets)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
