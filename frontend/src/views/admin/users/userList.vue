<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">User List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewUser">Add New User</button>
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
          initialSortBy: {field: 'user_id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
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
      />
    </div>

  </div>




</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      DEPT_DATA: [],
      ROLE_DATA: [],
      STATUS_DATA: [],
      myAPI: `${config.api}/api/users`,
      dataFields: [{
        label: 'ID',
        field: 'user_id',
        type: 'number'
      },{
        label: 'Username',
        field: 'email'
      },{
        label: 'First Name',
        field: 'f_name'
      },{
        label: 'Last Name',
        field: 'l_name'
      },{
        label: 'Phone',
        field: 'phone'
      },{
        label: 'Department',
        field: 'department.department_description'
      },{
        label: 'Role',
        field: 'role.role_description'
      },{
        label: 'Approver',
        field: 'is_approver'
      },{
        label: 'Status',
        field: 'status.status_description'
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
      this.$router.push({
        name: '/useradmin/edit',
        params: {
          user_id: params.row.user_id
        }
      })
    },
    addNewUser(){
      this.$router.push('/useradmin/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading User List)', 'error')
        })
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
