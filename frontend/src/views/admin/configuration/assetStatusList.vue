<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Asset Status List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAssetStatus">Add New Asset Status</button>
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
          initialSortBy: {field: 'assetStatus_id', type: 'asc'}
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

    <ModalWithDelete
      v-show="isModalVisible"
      @close="modalClose"
      @submit="modalSubmit"
      @delete="deleteItem"
    >
      <template v-slot:header>
        <span v-if="form.model.assetStatusId">Edit Asset Status Item</span>
        <span v-if="!form.model.assetStatusId">Add Asset Status Item</span>
      </template>

      <template v-slot:body>
        <FormulateInput
          @validation="validation1 = $event"
          type="text"
          name="assetStatusDescription"
          label="Asset Status Description"
          validation="required"
          v-model="form.model.assetStatusName"
          :validation-messages="{required: 'The Asset Status Description is required'}"
        />
      </template>

      <template v-slot:footer>
      </template>
    </ModalWithDelete>

  </div>

</template>

<script>
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'
import ModalWithDelete from "../../templates/ModalWithDelete.vue";
import {ModelListSelect, ModelSelect} from "vue-search-select";

export default {
  data() {
    return {
      isModalVisible: false,
      validation1: {},
      DB_DATA: [],
      myAPI: `${config.api}/api/assetStatus`,
      form: {
        model: {
          assetStatusId: '',
          assetStatusName: '',
        }
      },
      dataFields: [{
        label: 'id',
        field: 'assetStatus_id',
        type: 'number'
      },{
        label: 'name',
        field: 'assetStatus_name'
      }]
    };
  },

  components: {
    ModalWithDelete,
    ModelSelect,
    ModelListSelect,
    'vue-good-table': VueGoodTable
  },
  computed:{
    validationFormCheck: function () {
      if (this.validation1.hasErrors === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onRowDoubleClick(params){
      this.form.model.assetStatusId = params.row.assetStatus_id
      this.form.model.assetStatusName = params.row.assetStatus_name
      this.modalShow()
    },
    addNewAssetStatus(){
      this.form.model.assetStatusId = null
      this.form.model.assetStatusName = ''
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/assetStatus/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){
      axios.delete(`${config.api}/api/assetStatus/delete/` + this.form.model.assetStatusId)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The record has been deleted.',
            'success'
          )
          this.loadData();
          this.modalClose()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })},
    modalSubmit(){
      if(!this.validationFormCheck) {
        Swal.fire('Error', 'Something went wrong', 'error')
      } else {
        if(!this.form.model.assetStatusId) {
          axios.post(`${config.api}/api/assetStatus/create`, this.form.model)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been created.',
                'success'
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (create)', 'error')
            })
        } else {
          axios.put(`${config.api}/api/assetStatus/update`, this.form.model)
            .then((response) => {
              Swal.fire(
                'Done!',
                'The record has been updated.',
                'success'
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (update)', 'error')
            })
        }
      }
    },
    modalShow(){
      this.isModalVisible = true;
    },
    modalClose(){
      this.isModalVisible = false;
    },
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
