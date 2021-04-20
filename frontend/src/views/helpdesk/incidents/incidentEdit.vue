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
        <button v-if="!isNewIncident" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === 1" v-on:click="updateIncident">Update Incident</button>
        <button v-if="isNewIncident" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === 1" v-on:click="addIncident">Submit New Incident</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationEmail = $event"
          type="text"
          name="incidentName"
          label="Incident Name"
          validation="required"
          v-model="form.model.incidentName"
          :validation-messages="{required: 'The Incident Name is required'}"
        />
        <FormulateInput
          @validation="validationFname = $event"
          type="textarea"
          name="incidentDescription"
          label="Incident Description"
          validation="required"
          v-model="form.model.incidentDescription"
          :validation-messages="{required: 'The Incident Description is required'}"
        />
        <label v-if="!isNewIncident" class="form-custom-label" for="form-status">Type</label>
        <model-list-select :list="INCIDENTTYPE_DATA"
                           v-if="!isNewIncident"
                           v-model="form.model.incidentTypeId"
                           id="form-status"
                           option-value="incidentType_id"
                           option-text="incidentType_name"
                           placeholder="select one">
        </model-list-select>
        <br v-if="!isNewIncident" />
        <label class="form-custom-label" for="form-urgency">Urgency</label>
        <model-list-select :list="INCIDENTURGENCY_DATA"
                           v-model="form.model.incidentUrgencyId"
                           id="form-urgency"
                           option-value="incidentUrgency_id"
                           option-text="incidentUrgency_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-incidentstatus">Incident Status</label>
        <model-list-select :list="INCIDENTSTATUS_DATA"
                           v-model="form.model.incidentStatusId"
                           id="form-incidentstatus"
                           option-value="incidentStatus_id"
                           option-text="incidentStatus_name"
                           placeholder="select one">
        </model-list-select>
        <br />
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
      validationEmail: {},
      validationFname: {},
      validationLname: {},
      validationPhone: {},
      validationPass: {},
      validationPassConfirm: {},
      isNewIncident: true,
      DB_DATA: [],
      LOCATION_DATA: [],
      INCIDENTTYPE_DATA: [],
      INCIDENTURGENCY_DATA: [],
      INCIDENTSTATUS_DATA: [],
      form: {
        model: {
          incidentName: '',
          incidentDescription: '',
          createdById: '',
          createdBy: '',
          assignedTo: '',
          assignedTeam: '',
          locationId: '',
          incidentTypeId: '',
          incidentUrgencyId: '',
          incidentStatusId: '',
          createdAt: '',
          updatedAt: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationFormCheck: function () {
      if (this.validationEmail.hasErrors === false &&
        this.validationFname.hasErrors === false){
        return 1
      } else {
        return 0
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
      if(this.form.model.locationId === ''){this.form.model.locationId = null}

      console.log(this.form.model.locationId)

      axios.post(`${config.api}/api/incidents/create`, this.form.model)
        .then((response) => {
          //console.log(JSON.stringify(response.data))
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
          //this.DB_DATA = response.data;
          //console.log(JSON.stringify(this.DB_DATA))
          this.form.model.ticketName = response.data.ticket_title,
            this.form.model.ticketDescription = response.data.ticket_description,
            this.form.model.locationId = response.data.locationId,
            this.form.model.incidentTypeId = response.data.incidentTypeId,
            this.form.model.incidentUrgencyId = response.data.incidentUrgencyId,
            this.form.model.incidentStatusId = response.data.incidentStatusId,
            this.form.model.teamId = response.data.teamId,
            this.form.model.createdAt = response.data.CREATED_AT

          const createdByObj = response.data.createdBy
          const assignedToObj = response.data.assignedUser
          const assignedTeamObj = response.data.team

          if(response.data.created_by !== null) {this.form.model.createdBy = createdByObj.f_name + ' ' + createdByObj.l_name + ' (' + createdByObj.email +  ')'}
          if(response.data.assigned_user !== null) {this.form.model.assignedTo = assignedToObj.f_name + ' ' + assignedToObj.l_name + ' (' + assignedToObj.email +  ')'}
          if(response.data.teamId !== null) {this.form.model.assignedTeam = assignedTeamObj.team_name}

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding incident)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/incidentType/findlist`)
        .then((response) => {
          this.INCIDENTTYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentType)', 'error')
        })
      axios.get(`${config.api}/api/incidentUrgency/findlist`)
        .then((response) => {
          this.INCIDENTURGENCY_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentUrgency)', 'error')
        })
      axios.get(`${config.api}/api/locations/findlist`)
        .then((response) => {
          this.LOCATION_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
      axios.get(`${config.api}/api/incidentStatus/findlist`)
        .then((response) => {
          this.INCIDENTSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incidentStatus)', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
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
