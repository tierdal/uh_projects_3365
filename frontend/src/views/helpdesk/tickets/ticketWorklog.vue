<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewWorklogItem">Add New Worklog Item</button>
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
          initialSortBy: {field: 'workLog_id', type: 'desc'}
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
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import session from "../../../utilities/session";
import {VueGoodTable} from "vue-good-table";

export default {
  name: "ticketWorklog",
  props: ["ticket_id"],
  components: {
    'vue-good-table': VueGoodTable,
  },
  data() {
    return {
      isModalVisible: false,
      componentKey: 0,
      DB_DATA: [],
      dataFields: [{
        label: 'id',
        field: 'workLog_id',
        type: 'number'
      },{
        label: 'timestamp',
        field: 'workLog_time'
      },{
        label: 'User',
        field: 'email'
      },{
        label: 'description',
        field: 'workLog_text'
      }]
    };
  },
  methods: {
    onRowDoubleClick(params){
      if(session.getUser().user_id === params.row.userId) {
        Swal.fire({
          title: 'Edit Record',
          html:
            'Item ID: ' + params.row.workLog_id +
            '<br>' +
            '<form>Description <input id="form-description" class="swal2-input" placeholder="Description" value="' + params.row.workLog_text + '">' +
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
              id: params.row.workLog_id,
              description: result.value.description
            }
            axios.put(`${config.api}/api/worklog/update`, data)
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
          } else if (result.isDenied) {
            axios.delete(`${config.api}/api/worklog/delete/` + params.row.workLog_id)
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
      }
    },
    addNewWorklogItem(){
      Swal.fire({
        title: 'Add Worklog Item',
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
            ticketId: this.ticket_id,
            userId: session.getUser().user_id,
            description: result.value.description
          }
          axios.post(`${config.api}/api/worklog/create`, data)
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
      axios.get(`${config.api}/api/worklog/find/` + this.ticket_id)
        .then((response) => {
          this.DB_DATA = response.data;
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'user.email','email'))
          //console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding worklog items)', 'error')
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
}
</script>

<style scoped>
</style>
