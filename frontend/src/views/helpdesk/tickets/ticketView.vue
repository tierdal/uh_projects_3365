<template>
  <div>
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        Ticket Number: {{ this.ticket_id }}
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
        <button v-if="isITdepartment" class="swal2-editform swal2-styled" v-on:click="assignTicketShow">Assign Ticket</button>
      </div>
      <div class="editFormFooter-right">
        <button class="swal2-editform swal2-styled" v-on:click="editTicket">Edit Ticket</button>
        <button class="swal2-editform swal2-styled deleteButton" v-on:click="cancelTicket">Cancel Ticket</button>
        <button class="swal2-editform swal2-styled" v-on:click="closeTicket">Close Ticket</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          type="text"
          name="ticketName"
          label="Ticket Title"
          v-model="form.model.ticketName"
          :disabled="true"
        />
        <FormulateInput
          type="textarea"
          name="ticketDescription"
          label="Ticket Description"
          v-model="form.model.ticketDescription"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="requestStatus"
          label="Status"
          v-model="form.model.requestStatusName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="requestStatus"
          label="Status"
          v-model="form.model.priorityName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="issueCategory"
          label="Issue Category"
          v-model="form.model.issueCategoryName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="issueType"
          label="Issue Type"
          v-model="form.model.issueName"
          :disabled="true"
        />
      </div>
      <div class="editForm-right">
        <FormulateInput
          type="text"
          name="issueLocation"
          label="Issue Location"
          v-model="form.model.locationName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="hardwareAsset"
          label="Hardware Asset"
          v-model="form.model.assetName"
          :disabled="true"
        />
        <FormulateInput
          type="text"
          name="softwareAsset"
          label="Software Asset"
          v-model="form.model.softwareName"
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
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        Work Log
      </div>
    </div>

    <Modal
      v-show="isModalVisible"
      @close="assignTicketClose"
      @submit="assignTicket"
    >
      <template v-slot:header>
        This is a new modal header.
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

      <template v-slot:footer>
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
  name: "ticketView",
  props: ["ticket_id"],
  components: {
    Modal,
    ModelSelect,
    ModelListSelect
  },
  data() {
    return {
      isModalVisible: false,
      isITdepartment: false,
      isNewTicket: true,
      DB_DATA: [],
      USER_DATA: [],
      TEAM_DATA: [],
      form: {
        model: {
          ticketName: '',
          ticketDescription: '',
          createdBy: '',
          assignedToId: '',
          assignedTo: '',
          assignedTeamId: '',
          assignedTeam: '',
          locationName: '',
          assetName: '',
          softwareName: '',
          requestStatusName: '',
          issueName: '',
          priorityName: '',
          issueCategoryName: '',
          isResolved: '',
          resolvedName: '',
          resolutionNotes: '',
          createdAt: '',
          updatedAt: '',
          closedAt: ''
        },
      },
    };
  },
  methods: {
    goBack(){
      this.$router.push('/tickets')
    },
    assignTicket(){
      const ticketID = this.ticket_id
      axios.put(`${config.api}/api/tickets/assign/` + ticketID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The ticket has been updated.',
            'success'
          )
          lumberjack.logAudit(5, 'assign', this.ticket_id)
          this.assignTicketClose()
          this.loadData()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating ticket)', 'error')
        })
    },
    editTicket(){
      this.$router.push({
        name: '/tickets/edit',
        params: {
          ticket_id: this.ticket_id
        }
      })
    },
    cancelTicket(){},
    closeTicket(){},
    loadData(){
      axios.get(`${config.api}/api/tickets/find/` + this.ticket_id)
        .then((response) => {
          this.DB_DATA = response.data;
          //console.log(JSON.stringify(this.DB_DATA))
          this.form.model.ticketName = response.data.ticket_title,
          this.form.model.ticketDescription = response.data.ticket_description,
          this.form.model.locationId = response.data.locationId,
          this.form.model.assetId = response.data.assetId,
          this.form.model.softwareId = response.data.softwareId,
          this.form.model.issueId = response.data.issueId,
          this.form.model.issueCategoryId = response.data.issueCategoryId,
          this.form.model.assignedToId = response.data.assigned_user,
          this.form.model.assignedTeamId = response.data.teamId,
          this.form.model.isResolved = response.data.is_resolved,
          this.form.model.resolvedId = response.data.resolvedId,
          this.form.model.resolutionNotes = response.data.resolution_notes,
          this.form.model.createdAt = response.data.CREATED_AT,
          this.form.model.closedAt = response.data.CLOSED_AT

          const locationObj = response.data.location
          const assetObj = response.data.assetList
          const softwareObj = response.data.softwareAsset
          const issueTypeObj = response.data.issueType
          const issueCategoryObj = response.data.issueCategory
          const prioritylistObj = response.data.prioritylist
          const resolvedListObj = response.data.resolvedList
          const requestStatusObj = response.data.requestStatus
          const createdByObj = response.data.createdBy
          const assignedToObj = response.data.assignedUser
          const assignedTeamObj = response.data.team

          if(response.data.locationId !== null) {this.form.model.locationName = locationObj.location_name}
          if(response.data.assetId !== null) {this.form.model.assetName = assetObj.asset_name}
          if(response.data.softwareId !== null) {this.form.model.softwareName = softwareObj.software_name}
          if(response.data.issueId !== null) {this.form.model.issueName = issueTypeObj.issueType_name}
          if(response.data.issueCategoryId !== null) {this.form.model.issueCategoryName = issueCategoryObj.issueCategory_name}
          if(response.data.priorityId !== null) {this.form.model.priorityName = prioritylistObj.priority_name}
          if(response.data.resolvedId !== null) {this.form.model.resolvedName = resolvedListObj.resolvedList_name}
          if(response.data.requestStatusId !== null) {this.form.model.requestStatusName = requestStatusObj.requestStatus_name}
          if(response.data.created_by !== null) {this.form.model.createdBy = createdByObj.f_name + ' ' + createdByObj.l_name + ' (' + createdByObj.email +  ')'}
          if(response.data.assigned_user !== null) {this.form.model.assignedTo = assignedToObj.f_name + ' ' + assignedToObj.l_name + ' (' + assignedToObj.email +  ')'}
          if(response.data.teamId !== null) {this.form.model.assignedTeam = assignedTeamObj.team_name}

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
    assignTicketShow(){
      this.loadAssignedFields()
      this.isModalVisible = true;
    },
    assignTicketClose(){
      this.isModalVisible = false;
    }
  },
  beforeMount() {
    this.isITdepartmentCheck()
    if (this.ticket_id !== undefined){
      this.isNewTicket = false
      this.loadData()
    } else {
      this.goBack()
    }
  }
};
</script>

<style scoped>
</style>
