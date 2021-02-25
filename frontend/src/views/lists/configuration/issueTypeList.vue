<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Issue Type List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewIssueType">Add New Issue Type</button>
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
          initialSortBy: {field: 'issueType_id', type: 'asc'}
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
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
//import { mapActions } from 'vuex'
//import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
//import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
//import _ from "lodash";
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/issues`,
      dataFields: [{
        label: 'id',
        field: 'issueType_id',
        type: 'number'
      },{
        label: 'name',
        field: 'issueType_name'
      },{
        label: 'description',
        field: 'issueType_description'
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
          'Item ID: ' + params.row.issueType_id +
          '<br>' +
          '<form>Name <input id="form-name" class="swal2-input" placeholder="Name" value="' + params.row.issueType_name + '">' +
          '</form>' +
          '<form>Description <input id="form-description" class="swal2-input" placeholder="Description" value="' + params.row.issueType_description + '">' +
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
          const name = document.getElementById('form-name').value
          if (!description && !name) {
            Swal.showValidationMessage(`Name or Description cannot be blank`)
          }
          return {description: description, name: name}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            id: params.row.issueType_id,
            name: result.value.name,
            description: result.value.description
          }
          axios.put(`${config.api}/api/issues/update`, data)
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
          const issueTypeID = params.row.issueType_id
          axios.delete(`${config.api}/api/issues/delete/` + issueTypeID)
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
    addNewIssueType(){
      Swal.fire({
        title: 'Add Record',
        html:
          '<form>Name <input id="form-name" class="swal2-input" placeholder="Name">' +
          '</form>' +
          '<form>Description <input id="form-description" class="swal2-input" placeholder="Description">' +
          '</form>'
        ,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const description = document.getElementById('form-description').value
          const name = document.getElementById('form-name').value
          if (!description && !name) {
            Swal.showValidationMessage(`Name or Description cannot be blank`)
          }
          return {description: description, name: name}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            name: result.value.name,
            description: result.value.description
          }
          axios.post(`${config.api}/api/issues/create`, data)
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
      axios.get(`${config.api}/api/issues/find`)
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
          console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){},
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
