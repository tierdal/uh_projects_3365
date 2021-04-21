<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Incident Type List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewIncidentType">Add New Incident Type</button>
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
          initialSortBy: {field: 'incidentType_id', type: 'asc'}
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
        <span v-if="form.model.incidentTypeId">Edit Incident Type Item</span>
        <span v-if="!form.model.incidentTypeId">Add Incident Type Item</span>
      </template>

      <template v-slot:body>
        <FormulateInput
          @validation="validation1 = $event"
          type="text"
          name="incidentTypeName"
          label="Incident Type Name"
          validation="required"
          v-model="form.model.incidentTypeName"
          :validation-messages="{required: 'The Incident Type Name is required'}"
        />
        <br>
        <label class="form-custom-label" for="form-teamList">SLA</label>
        <model-list-select :list="TEAMS_DATA"
                           v-model="form.model.teamId"
                           id="form-teamList"
                           option-value="team_id"
                           option-text="team_name"
                           :isError='validationTEAM === true'
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
      TEAMS_DATA: [],
      myAPI: `${config.api}/api/incidentType`,
      form: {
        model: {
          incidentTypeId: '',
          incidentTypeName: '',
          teamId: '',
          teamName: '',
        }
      },
      dataFields: [{
        label: 'id',
        field: 'incidentType_id',
        type: 'number'
      },{
        label: 'name',
        field: 'incidentType_name'
      },{
        label: 'TEAMID',
        field: 'team.team_id',
        hidden: true
      },{
        label: 'Responsible Team',
        field: 'team.team_name'
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
    validationTEAM: function () {
      if (this.form.model.teamId === null){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validation1.hasErrors === false && this.validationTEAM === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onRowDoubleClick(params){
      this.form.model.incidentTypeId = params.row.incidentType_id
      this.form.model.incidentTypeName = params.row.incidentType_name
      this.form.model.teamId = params.row.team.team_id
      this.loadFields()
      this.modalShow()
    },
    addNewIncidentType(){
      this.form.model.incidentTypeId = null
      this.form.model.incidentTypeName = ''
      this.form.model.teamId = null
      this.loadFields()
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/incidentType/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went with incidentType', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/teams/find`)
        .then((response) => {
          this.TEAMS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){
      axios.delete(`${config.api}/api/incidentType/delete/` + this.form.model.incidentTypeId)
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
        if(!this.form.model.incidentTypeId) {
          axios.post(`${config.api}/api/incidentType/create`, this.form.model)
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
          axios.put(`${config.api}/api/incidentType/update`, this.form.model)
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
