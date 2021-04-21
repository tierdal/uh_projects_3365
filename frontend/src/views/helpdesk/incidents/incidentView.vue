<template>
  <div>
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        Incident Number: {{ this.incident_id }}
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
        <button v-if="isITdepartment" class="swal2-editform swal2-styled" v-on:click="assignIncidentShow">Assign Incident</button>
      </div>
      <div class="editFormFooter-right">
        <button class="swal2-editform swal2-styled" v-on:click="editIncident">Edit Incident</button>
      </div>
    </div>

    <br/>

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          type="text"
          name="incidentName"
          label="Incident Name"
          v-model="form.model.incidentName"
          :disabled="true"
        />
        <FormulateInput
          type="textarea"
          name="incidentDescription"
          label="Incident Description"
          v-model="form.model.incidentDescription"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="incidentUrgency"
          label="Urgency"
          v-model="form.model.incidentUrgencyName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="incidentStatus"
          label="Status"
          v-model="form.model.incidentStatusName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="incidentType"
          label="Incident Type"
          v-model="form.model.incidentTypeName"
          :disabled="true"
        />
      </div>
      <div class="editForm-right">
        <FormulateInput
          type="text"
          name="issueLocation"
          label="Issue Location"
          v-model="form.model.incidentLocationName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="createdBy"
          label="Created By"
          v-model="form.model.createdBy"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="assignedTo"
          label="Assigned To"
          v-model="form.model.assignedTo"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="assignedTeam"
          label="Assigned Team"
          v-model="form.model.assignedTeam"
          :disabled="true"
        />
      </div>
    </form>
    <br>

    <!-- Assign Ticket -->
    <Modal
      v-show="isAssignIncidentVisible"
      @close="assignIncidentClose"
      @submit="assignIncident"
    >
      <template v-slot:header>
        Assign User and Team
      </template>

      <template v-slot:body>
        <label class="form-custom-label" for="form-assigneduser">Assigned User</label>
        <model-list-select :list="USER_DATA"
                           v-model="form.model.assignedToId"
                           id="form-assigneduser"
                           option-value="user_id"
                           option-text="email"
                           placeholder="select one">
        </model-list-select>
        <br>
        <label class="form-custom-label" for="form-assignedteam">Assigned Team</label>
        <model-list-select :list="TEAM_DATA"
                           v-model="form.model.assignedTeamId"
                           id="form-assignedteam"
                           option-value="team_id"
                           option-text="team_name"
                           placeholder="select one">
        </model-list-select>
      </template>

    </Modal>

  </div>
</template>

<script>
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import session from "../../../utilities/session";
import Modal from "../../templates/Modal.vue";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select';
import lumberjack from '../../../utilities/lumberjack'

export default {
  name: "incidentView",
  props: ["incident_id"],
  components: {
    Modal,
    ModelSelect,
    ModelListSelect
  },
  data() {
    return {
      isNewIncident: true,
      isAssignIncidentVisible: false,
      DB_DATA: [],
      USER_DATA: [],
      INCIDENTTYPE_DATA: [],
      INCIDENTURGENCY_DATA: [],
      LOCATION_DATA: [],
      INCIDENTSTATUS: [],
      TEAM_DATA: [],
      form: {
        model: {
          incidentName: '',
          incidentDescription: '',
          incidentTypeId: '',
          incidentTypeName: '',
          incidentUrgencyId: '',
          incidentUrgencyName: '',
          createdById: '',
          createdByName: '',
          assignedToId: '',
          assignedToName: '',
          assignedTeamId: '',
          assignedTeamName: '',
          incidentLocationId: '',
          incidentLocationName: '',
          incidentStatusId: '',
          incidentStatusName: '',
          resolvedId: '',
          resolvedName: '',
          resolutionNotes: '',
          createdAt: '',
          updatedAt: '',
          closedAt: '',
        },
      },
    };
  },
  methods: {
    goBack(){
      this.$router.push('/helpdesk/incidents')
    },
    assignIncident(){
      const incidentID = this.incident_id
      this.form.model.requestStatusId = 3
      axios.put(`${config.api}/api/incidents/assign/` + incidentID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The incident has been updated.',
            'success'
          )

          const data = {
            incidentId: this.incident_id,
            userId: session.getUser().user_id,
            description: 'Incident was assigned.'
          }
          axios.post(`${config.api}/api/incidentlog/create`, data)
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
          this.componentKey += 1;

          lumberjack.logAudit(5, 'assign', this.incident_id)
          this.assignTicketClose()
          this.loadData()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating incident)', 'error')
        })
    },
    editIncident(){
      this.$router.push({
        name: '/helpdesk/incidents/edit',
        params: {
          incident_id: this.incident_id
        }
      })
    },
    loadData(){
      axios.get(`${config.api}/api/incidents/find/` + this.incident_id)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.incidentName = response.data.incident_name,
          this.form.model.incidentDescription = response.data.incident_description,
          this.form.model.incidentTypeId = response.data.incidentTypeId,
          this.form.model.incidentUrgencyId = response.data.incidentUrgencyId,
          this.form.model.incidentStatusId = response.data.incidentStatusId,
          this.form.model.incidentLocationId = response.data.incident_location,
          this.form.model.createdById = response.data.incident_createdBy,
          this.form.model.assignedToId = response.data.incident_assignedUser,
          this.form.model.assignedTeamId = response.data.incident_assignedTeam,
          this.form.model.isResolved = response.data.is_resolved,
          this.form.model.resolvedId = response.data.resolvedId,
          this.form.model.resolutionNotes = response.data.resolution_notes,
          this.form.model.createdAt = response.data.CREATED_AT,
          this.form.model.closedAt = response.data.CLOSED_AT

          const createdByObj = response.data.createdBy
          const assignedToObj = response.data.assignedUser
          const resolvedListObj = response.data.resolvedList
          const locationObj = response.data.location
          const incidentTypeObj = response.data.incidentType
          const incidentStatusObj = response.data.incidentStatus
          const incidentUrgencyObj = response.data.incidentUrgency
          const assignedTeamObj = response.data.team

          if(response.data.incident_createdBy !== null) {this.form.model.createdByName = createdByObj.f_name + ' ' + createdByObj.l_name + ' (' + createdByObj.email +  ')'}
          if(response.data.incident_assignedUser !== null) {this.form.model.assignedToName = assignedToObj.f_name + ' ' + assignedToObj.l_name + ' (' + assignedToObj.email +  ')'}
          if(response.data.resolvedId !== null) {this.form.model.resolvedName = resolvedListObj.resolvedList_name}
          if(response.data.incident_location !== null) {this.form.model.locationName = locationObj.location_name}
          if(response.data.incidentTypeId !== null) {this.form.model.incidentTypeName = incidentTypeObj.incidentType_name}
          if(response.data.incidentStatusId !== null) {this.form.model.incidentStatusName = incidentStatusObj.incidentStatus_name}
          if(response.data.incidentUrgencyId !== null) {this.form.model.incidentUrgencyName = incidentUrgencyObj.incidentUrgency_name}
          if(response.data.incident_assignedTeam !== null) {this.form.model.assignedTeamName = assignedTeamObj.team_name}

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding ticket)', 'error')
        })
    },
    loadAssignedFields(){
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.USER_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading users)', 'error')
        })
      axios.get(`${config.api}/api/teams/find`)
        .then((response) => {
          this.TEAM_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading teams)', 'error')
        })
    },
    isITdepartmentCheck(){
      const department = session.getUser().departmentId
      if (department === 1){
        return this.isITdepartment = true
      } else {
        return this.isITdepartment = false
      }
    },
    assignIncidentShow(){
      this.loadAssignedFields()
      this.isAssignIncidentVisible = true;
    },
    assignIncidentClose(){
      this.isAssignIncidentVisible = false;
    },
    resolveTicketShow(){
      this.loadResolvedFields()
      this.isResolveTicketVisible = true;
    },
    resolveTicketClose(){
      this.isResolveTicketVisible = false;
    },
    changeStatusShow(){
      this.loadChangedStatusFields()
      this.isChangeStatusVisible = true;
    },
    changeStatusClose(){
      this.isChangeStatusVisible = false;
    }
  },
  beforeMount() {
    this.isITdepartmentCheck()
    if (this.incident_id !== undefined){
      this.isNewIncident = false
      this.loadData()
    } else {
      this.goBack()
    }
  }
};
</script>

<style scoped>
.resolveButton {
  background-color: #41b883 !important;
}
</style>
