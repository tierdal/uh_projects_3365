<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewIncident" class="dashlabel">
        Incident Number: {{ this.incident_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Incident
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewIncident" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateIncident">Update Incident</button>
        <button v-if="isNewIncident" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addIncident">Submit New Incident</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="incidentName"
          label="Incident Name"
          validation="required"
          v-model="form.model.incidentName"
          :validation-messages="{required: 'The Incident Name is required'}"
        />
        <FormulateInput
          type="textarea"
          name="incidentDescription"
          label="Incident Description"
          v-model="form.model.incidentDescription"
        />
        <br v-if="!isNewIncident" />
        <label class="form-custom-label" for="form-urgency">Urgency</label>
        <model-list-select :list="INCIDENTURGENCY_DATA"
                           v-model="form.model.incidentUrgencyId"
                           id="form-urgency"
                           option-value="incidentUrgency_id"
                           option-text="incidentUrgency_name"
                           :isError='validationUrgency === true'
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-incidentStatus">Incident Status</label>
        <model-list-select :list="INCIDENTSTATUS_DATA"
                           v-model="form.model.incidentStatusId"
                           id="form-incidentStatus"
                           option-value="incidentStatus_id"
                           option-text="incidentStatus_name"
                           :isError='validationStatus === true'
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-incidentType">Incident Type</label>
        <model-list-select :list="INCIDENTTYPE_DATA"
                           v-model="form.model.incidentTypeId"
                           id="form-incidentType"
                           option-value="incidentType_id"
                           option-text="incidentType_name"
                           :isError='validationType === true'
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-location">Incident Location</label>
        <model-list-select :list="LOCATION_DATA"
                           v-model="form.model.locationId"
                           id="form-location"
                           option-value="location_id"
                           option-text="location_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <FormulateInput
          v-if="!isNewIncident"
          type="text"
          name="createdBy"
          label="Created By"
          v-model="form.model.createdBy"
          :disabled="true"
        />
        <FormulateInput
          v-if="!isNewIncident"
          type="text"
          name="assignedTo"
          label="Assigned To"
          v-model="form.model.assignedTo"
          :disabled="true"
        />
        <FormulateInput
          v-if="!isNewIncident"
          type="text"
          name="assignedTeam"
          label="Assigned Team"
          v-model="form.model.assignedTeam"
          :disabled="true"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import session from "../../../utilities/session";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select';
import lumberjack from '../../../utilities/lumberjack'

export default {
  name: "incidentEdit",
  props: ["incident_id"],
  data() {
    return {
      isITdepartment: false,
      validationName: {},
      isNewIncident: true,
      DB_DATA: [],
      LOCATION_DATA: [],
      INCIDENTURGENCY_DATA: [],
      INCIDENTSTATUS_DATA: [],
      INCIDENTTYPE_DATA: [],
      form: {
        model: {
          incidentName: '',
          incidentDescription: '',
          incidentTypeId: '',
          incidentUrgencyId: '',
          incidentStatusId: '',
          incidentLocationId: '',
          createdById: '',
          createdBy: '',
          assignedTo: '',
          assignedTeamId: '',
          isResolved: '',
          resolvedId: '',
          resolutionNotes: '',
          createdAt: '',
          closedAt: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationUrgency: function () {
      if (this.form.model.incidentUrgencyId === ''){
        return true
      } else {
        return false
      }
    },
    validationStatus: function () {
      if (this.form.model.incidentStatusId === ''){
        return true
      } else {
        return false
      }},
    validationType: function () {
      //this.loadIncidentType()
      if (this.form.model.incidentTypeId === ''){
        return true
      } else {
        return false
      }},
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationUrgency === false &&
        this.validationStatus === false &&
        this.validationType === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      if(this.isNewIncident){ this.$router.push('/helpdesk/incidents') } else {
        this.$router.push({
          name: '/helpdesk/incidents/view',
          params: {
            incident_id: this.incident_id
          }
        })
      }
    },
    addIncident(){
      this.form.model.createdById = session.getUser().user_id

      axios.post(`${config.api}/api/incidents/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          lumberjack.logAudit(5, 'create', response.data)
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating incidents)', 'error')
        })
    },
    updateIncident(){
      const incidentID = this.incident_id
      axios.put(`${config.api}/api/incidents/update/` + incidentID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The incident has been updated.',
            'success'
          )
          lumberjack.logAudit(5, 'update', this.incident_id)
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating incident)', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/incidents/find/` + this.incident_id)
        .then((response) => {
          this.form.model.incidentName = response.data.incident_name,
            this.form.model.incidentDescription = response.data.incident_description,
            this.form.model.locationId = response.data.locationId,
            this.form.model.incidentStatusId = response.data.incidentStatusId,
            this.form.model.incidentUrgencyId = response.data.incidentUrgencyId,
            this.form.model.incidentTypeId = response.data.incidentTypeId,
            this.form.model.teamId = response.data.teamId,
            this.form.model.isResolved = response.data.is_resolved,
            this.form.model.resolvedId = response.data.resolvedId,
            this.form.model.resolutionNotes = response.data.resolution_notes,
            this.form.model.createdAt = response.data.CREATED_AT,
            this.form.model.closedAt = response.data.CLOSED_AT

          const createdByObj = response.data.createdBy
          const assignedToObj = response.data.assignedUser
          const assignedTeamObj = response.data.team

          if(response.data.incident_createdBy !== null) {this.form.model.createdBy = createdByObj.f_name + ' ' + createdByObj.l_name + ' (' + createdByObj.email +  ')'}
          if(response.data.incident_assignedUser !== null) {this.form.model.assignedTo = assignedToObj.f_name + ' ' + assignedToObj.l_name + ' (' + assignedToObj.email +  ')'}
          if(response.data.incident_assignedTeam !== null) {this.form.model.assignedTeam = assignedTeamObj.team_name}

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding incident)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/locations/findlist`)
        .then((response) => {
          this.LOCATION_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
      axios.get(`${config.api}/api/incidentStatus/find`)
        .then((response) => {
          this.INCIDENTSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentStatus)', 'error')
        })
      axios.get(`${config.api}/api/incidentUrgency/findlist`)
        .then((response) => {
          this.INCIDENTURGENCY_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentUrgency)', 'error')
        })
      axios.get(`${config.api}/api/incidentStatus/find`)
        .then((response) => {
          this.INCIDENTSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentUrgency)', 'error')
        })
      axios.get(`${config.api}/api/incidentType/find`)
        .then((response) => {
          this.INCIDENTTYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentType)', 'error')
        })
    },
    loadIncidentType(){
      this.INCIDENTTYPE_DATA = []
      axios.get(`${config.api}/api/incidentType/find`, {params: this.form.model})
        .then((response) => {
          this.INCIDENTTYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentType)', 'error')
        })
    },
    isITdepartmentCheck(){
      const department = session.getUser().departmentId
      if (department === 1){
        return this.isITdepartment = true
      } else {
        return this.isITdepartment = false
      }
    }
  },
  beforeMount() {
    this.isITdepartmentCheck()
    this.loadFields()
    if (this.incident_id !== undefined){
      this.isNewIncident = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
