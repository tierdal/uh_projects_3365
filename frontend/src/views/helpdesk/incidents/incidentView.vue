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
        <button :key="form.model.isResolved" v-if="isITdepartment && !form.model.isResolved" class="swal2-editform swal2-styled" v-on:click="changeStatusShow">Change Status</button>
        <button :key="form.model.isResolved" v-if="isITdepartment && !form.model.isResolved" class="swal2-editform swal2-styled" v-on:click="assignIncidentShow">Assign Incident</button>
        <button :key="form.model.isResolved" v-if="isITdepartment && !form.model.isResolved" class="swal2-editform swal2-styled resolveButton" v-on:click="resolveIncidentShow">Resolve Incident</button>
      </div>
      <div class="editFormFooter-right">
        <button :key="form.model.isResolved" v-if="!form.model.isResolved" class="swal2-editform swal2-styled" v-on:click="editIncident">Edit Incident</button>
        <button :key="form.model.isResolved" v-if="!form.model.isResolved" class="swal2-editform swal2-styled deleteButton" v-on:click="cancelIncident">Cancel Incident</button>
        <button :key="form.model.isResolved" v-if="form.model.isResolved" class="swal2-editform swal2-styled" v-on:click="reopenIncident">Re-Open Incident</button>
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
          v-model="form.model.createdByName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="assignedTo"
          label="Assigned To"
          v-model="form.model.assignedToName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="assignedTeam"
          label="Assigned Team"
          v-model="form.model.assignedTeamName"
          :disabled="true"
        />
      </div>
    </form>
    <br>

    <!-- Assign Incident -->
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

    <Modal
      v-show="isResolveIncidentVisible"
      @close="resolveIncidentClose"
      @submit="resolveIncident"
    >

      <template v-slot:header>
        Resolve Incident
      </template>

      <template v-slot:body>
        <label class="form-custom-label" for="form-resolvedlist">Resolution Reason</label>
        <model-list-select :list="RESOLVED_DATA"
                           v-model="form.model.resolvedId"
                           id="form-resolvedlist"
                           option-value="resolvedList_id"
                           option-text="resolvedList_name"
                           placeholder="select one">
        </model-list-select>
        <FormulateInput
          @validation="validationFname = $event"
          type="textarea"
          name="incidentResolutionNotes"
          label="Resolution Notes"
          validation="required"
          v-model="form.model.resolutionNotes"
          :validation-messages="{required: 'The Resolution Notes is required'}"
        />
      </template>

      <template v-slot:footer>
      </template>
    </Modal>

    <Modal
      v-show="isChangeStatusVisible"
      @close="changeStatusClose"
      @submit="changeStatus"
    >
    <template v-slot:header>
      Change Incident Status
    </template>

    <template v-slot:body>
      <label class="form-custom-label" for="form-incidentStatus">Incident Status</label>
      <model-list-select :list="INCIDENTSTATUS_DATA"
                         v-model="form.model.incidentStatusId"
                         id="form-incidentStatus"
                         option-value="incidentStatus_id"
                         option-text="incidentStatus_name"
                         placeholder="select one">
      </model-list-select>
      <br>
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
      isAssignIncidentVisible: false,
      isChangeStatusVisible: false,
      isResolveIncidentVisible: false,
      //componentKey: 0,
      isITdepartment: false,
      isNewIncident: true,
      DB_DATA: [],
      USER_DATA: [],
      INCIDENTTYPE_DATA: [],
      INCIDENTURGENCY_DATA: [],
      LOCATION_DATA: [],
      INCIDENTSTATUS_DATA: [],
      RESOLVED_DATA: [],
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
          isResolved: '',
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
      this.form.model.incidentStatusId = 2
      axios.put(`${config.api}/api/incidents/assign/` + incidentID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The incident has been assigned.',
            'success'
          )
          //this.componentKey += 1;

          //lumberjack.logAudit(3, 'assign', this.incident_id)
          this.assignIncidentClose()
          this.loadData()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating incident)', 'error')
        })
    },
    changeStatus(){
      const incidentID = this.incident_id
      if(this.form.model.incidentStatusId === 5 || this.form.model.incidentStatusId === 6 || this.form.model.incidentStatusId === 7) {
        this.form.model.isResolved = true

      } else {
        this.form.model.isResolved = false
      }
      axios.put(`${config.api}/api/incidents/changestatus/` + incidentID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The incident has been updated.',
            'success'
          )
          //this.componentKey += 1;
          //lumberjack.logAudit(5, 'change status', this.incident_id)
          this.changeStatusClose()
          this.loadData()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (changing status)', 'error')
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
    cancelIncident(){
      Swal.fire({
        title: 'Cancel Incident',
        html: 'Are you sure you want to cancel this incident?',
        showCancelButton: true,
        showDenyButton: false,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          cancelButton: 'order-2',
          confirmButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const incidentID = this.incident_id
          axios.put(`${config.api}/api/incidents/cancel/` + incidentID)
            .then((response) => {
              Swal.fire(
                'Done!',
                'The incident has been cancelled.',
                'success'
              )
              //this.componentKey += 1;

              //lumberjack.logAudit(5, 'cancel', this.incident_id)
              this.loadData()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    resolveIncident(){
      const incidentID = this.incident_id
      this.form.model.assignedToId = session.getUser().user_id
      axios.put(`${config.api}/api/incidents/resolve/` + incidentID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The incident has been solved.',
            'success'
          )

          //lumberjack.logAudit(5, 'resolve', this.incident_id)

          //this.componentKey += 1;
          this.resolveIncidentClose()
          this.loadData()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (resolving incident)', 'error')
        })},
    reopenIncident(){
      Swal.fire({
        title: 'Re-Open Incident',
        html: 'Are you sure you want to re-open this incident?',
        showCancelButton: true,
        showDenyButton: false,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          cancelButton: 'order-2',
          confirmButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const incidentID = this.incident_id
          this.form.model.incidentStatusId = 2
          this.form.model.isResolved = false
          axios.put(`${config.api}/api/incidents/changestatus/` + incidentID, this.form.model)
            .then((response) => {
              Swal.fire(
                'Done!',
                'The incident has been re-opened.',
                'success'
              )
              //this.componentKey += 1;

              //lumberjack.logAudit(5, 'reopen', this.incident_id)
              this.loadData()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (updating incident)', 'error')
            })
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
          Swal.fire('Error', 'Something went wrong (finding incident)', 'error')
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
    loadResolvedFields(){
      axios.get(`${config.api}/api/resolvedList/find`)
        .then((response) => {
          this.RESOLVED_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading resolved list)', 'error')
        })
    },
    loadChangedStatusFields(){
      axios.get(`${config.api}/api/incidentStatus/find`)
        .then((response) => {
          this.INCIDENTSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading incident Status list)', 'error')
        })},
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
    resolveIncidentShow(){
      this.loadResolvedFields()
      this.isResolveIncidentVisible = true;
    },
    resolveIncidentClose(){
      this.isResolveIncidentVisible = false;
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
