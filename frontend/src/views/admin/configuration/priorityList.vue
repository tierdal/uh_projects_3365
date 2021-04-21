<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Priority List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewPriority">Add New Priority</button>
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
          initialSortBy: {field: 'priority_id', type: 'asc'}
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
        <span v-if="form.model.priorityId">Edit Priority List Item</span>
        <span v-if="!form.model.priorityId">Add Priority List Item</span>
      </template>

      <template v-slot:body>
        <FormulateInput
          @validation="validation1 = $event"
          type="text"
          name="priorityListName"
          label="Priority List Name"
          validation="required"
          v-model="form.model.priorityName"
          :validation-messages="{required: 'The Priority List Name is required'}"
        />
        <br>
        <label class="form-custom-label" for="form-slaList">SLA</label>
        <model-list-select :list="SLA_DATA"
                           v-model="form.model.slaId"
                           id="form-slaList"
                           option-value="sla_id"
                           option-text="sla_name"
                           :isError='validationSLA === true'
                           placeholder="select one">
        </model-list-select>
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
      SLA_DATA: [],
      myAPI: `${config.api}/api/priorityList`,
      form: {
        model: {
          priorityId: '',
          priorityName: '',
          slaId: '',
          slaName: '',
        }
      },
      dataFields: [{
        label: 'id',
        field: 'priority_id',
        type: 'number'
      },{
        label: 'name',
        field: 'priority_name'
      },{
        label: 'SLAID',
        field: 'slaList.sla_id',
        hidden: true
      },{
        label: 'SLA',
        field: 'slaList.sla_name'
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
    validationSLA: function () {
      if (this.form.model.slaId === null){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validation1.hasErrors === false && this.validationSLA === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onRowDoubleClick(params){
      this.form.model.priorityId = params.row.priority_id
      this.form.model.priorityName = params.row.priority_name
      this.form.model.slaId = params.row.slaList.sla_id
      this.loadFields()
      this.modalShow()
    },
    addNewPriority(){
      this.form.model.priorityId = null
      this.form.model.priorityName = ''
      this.form.model.slaId = null
      this.loadFields()
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/priorityList/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/slaList/find`)
        .then((response) => {
          this.SLA_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){
      axios.delete(`${config.api}/api/priorityList/delete/` + this.form.model.priorityId)
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
        })
    },
    modalSubmit(){
      if(!this.validationFormCheck) {
        Swal.fire('Error', 'Please fix the errors', 'error')
      } else {
        if(!this.form.model.priorityId) {
          axios.post(`${config.api}/api/priorityList/create`, this.form.model)
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
          axios.put(`${config.api}/api/priorityList/update`, this.form.model)
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
button {
  margin-right: 15px;
  height: 100%;
}
</style>
