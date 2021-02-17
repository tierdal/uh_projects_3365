<template>
  <div>
    <h4>Department List</h4>

    <br>

    <div>
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
          initialSortBy: {field: 'id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 3,
          position: 'top',
          perPageDropdown: [3, 5, 10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
        @on-row-mouseenter="onRowMouseover"
        @on-row-mouseleave="onRowMouseleave"
      >
        <div slot="table-actions">
          <button>Add New Department</button>
        </div>
      </vue-good-table>
    </div>

  </div>




</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
//import { mapActions } from 'vuex'
//import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
//import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
//import _ from "lodash";
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/departments`,
      dataFields: [{
        label: 'id',
        field: 'id',
        type: 'number'
      },{
        label: 'description',
        field: 'description'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument
      // indicates selected or not
      // params.event - click event
      console.log(params.row.id)
      console.log(params.row.description)
      swal('Edit Record', 'ID: ' + params.row.id + ', Description: ' + params.row.description, 'error')
    },
    onRowMouseover(params) {
      console.log('Hovering over: ' + params.row.id)
      console.log(JSON.stringify(params.row))
      console.log(JSON.stringify(params.pageIndex))
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
    },
    onRowMouseleave(row, pageIndex) {
      // row - row object
      // pageIndex - index of this row on the current page.
    },
    /*rowStyleClassFn(row) {
      return row.active ? 'VGT-row-red' : 'VGT-row';;
    },*/
    deleteItem(){},
  },
  beforeMount() {
    axios.get(`${config.api}/api/departments`)
      .then((response) => {
        this.DB_DATA = response.data;
        /*this.dataLength = response.data.length;
        console.log('Status: ' + response.status + ' ' + response.statusText)
        console.log('Headers:')
        console.log(response.headers)
        console.log('Config:')
        console.log(response.config)
        console.log('Data:')
        console.log(response.data)
        console.log(JSON.stringify(response.data))
        console.log(JSON.stringify(response.data.length))*/
      })
      .catch(() => {
        swal('Error', 'Something went wrong', 'error')
      })
  }
};
</script>

<style scoped>
  button {
    margin-right: 15px;
    height: 100%;
  }
</style>
