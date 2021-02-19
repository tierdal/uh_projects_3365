<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">User List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-addnew swal2-styled" v-on:click="addNewUser">Add New User</button>
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
import axios from '../../utilities/axios';
import config from '../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
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
        //field: this.getDeptItem
        field: 'departmentDesc'
      },{
        label: 'Role',
        field: 'roleDesc'
      },{
        label: 'Approver',
        field: 'is_approver'
      },{
        label: 'Status',
        field: 'statusDesc'
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
      Swal.fire({
        title: 'Edit Record',
        html:
          'User ID: ' + params.row.user_id +
          '<br>' +
          '<form>Description <input id="form-description" class="swal2-input" placeholder="Description" value="' + params.row.description + '">' +
          '</form>'
        ,
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        denyButtonText: `Delete Record`,
        customClass: {
          denyButton: 'order-1 right-gap',
          cancelButton: 'order-2',
          confirmButton: 'order-3',
        },
        preConfirm: () => {
          const description = document.getElementById('form-description').value
          if (!description) {
            Swal.showValidationMessage(`Description cannot be blank`)
          }
          return {description: description}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            id: params.row.id,
            description: result.value.description
          }
          axios.put(`${config.api}/api/users/update`, data)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been updated.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        } else if (result.isDenied){
          const departmentID = params.row.id
          axios.delete(`${config.api}/api/users/delete/` + departmentID)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been deleted.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    addNewUser(){
      Swal.fire({
        title: 'Add Record',
        html:
          '<form>Description <input id="form-description" class="swal2-input" placeholder="Description">' +
          '</form>'
        ,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const description = document.getElementById('form-description').value
          if (!description) {
            Swal.showValidationMessage(`Description cannot be blank`)
          }
          return {description: description}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            description: result.value.description
          }
          axios.post(`${config.api}/api/users/create`, data)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been created.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    loadData(){
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'status.id','statusId'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'status.description','statusDesc'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'role.id','roleId'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'role.description','roleDesc'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'department.id','departmentId'))
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'department.description','departmentDesc'))

          //response.data = response.data.replace("\"status.description\":", "\"statusDesc\":")
          //response.data = response.data.replace("\"department.description\":", "\"departmentDesc\":")
          //response.data = response.data.replace("\"role.description\":", "\"roleDesc\":")
          //this.dataLength = response.data.length;
          //console.log('Status: ' + response.status + ' ' + response.statusText)
          //console.log('Headers:')
          //console.log(response.headers)
          //console.log('Config:')
          //console.log(response.config)
          //console.log('Data:')
          //console.log(response.data)
          console.log(JSON.stringify(this.DB_DATA))
          //console.log(JSON.stringify(response.data.length))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){},
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
