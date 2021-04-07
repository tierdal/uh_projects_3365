<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">FAQ Category List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewfaqCategory">Add New FAQ Category</button>
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
          initialSortBy: {field: 'faq_category_id', type: 'asc'}
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
      myAPI: `${config.api}/api/faqCategory`,
      dataFields: [{
        label: 'id',
        field: 'faq_category_id',
        type: 'number'
      },{
        label: 'description',
        field: 'faq_category_description'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){

      Swal.fire({
        title: 'Edit Record',
        html:
          'Item ID: ' + params.row.faq_category_id +
          '<br>' +
          '<form>Description <input id="form-description" class="swal2-input" placeholder="Description" value="' + params.row.faq_category_description + '">' +
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
            Swal.showValidationMessage(`description cannot be blank`)
          }
          return {description: description}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            id: params.row.faq_category_id,
            description: result.value.description,
          }
          axios.put(`${config.api}/api/faqCategory/update`, data)
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
          const faq_categoryID = params.row.faq_category_id
          axios.delete(`${config.api}/api/faqCategory/delete/` + faq_categoryID)
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
    addNewfaqCategory(){
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
            description: result.value.description,
          }
          axios.post(`${config.api}/api/faqCategory/create`, data)
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
      axios.get(`${config.api}/api/faqCategory/find`)
        .then((response) => {
          this.DB_DATA = response.data;
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
