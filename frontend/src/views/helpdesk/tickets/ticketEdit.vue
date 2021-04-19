<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewTicket" class="dashlabel">
        Ticket Number: {{ this.ticket_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Ticket
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewTicket" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === 1" v-on:click="updateTicket">Update Ticket</button>
        <button v-if="isNewTicket" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === 1" v-on:click="addTicket">Submit New Ticket</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationEmail = $event"
          type="text"
          name="ticketName"
          label="Ticket Title"
          validation="required"
          v-model="form.model.ticketName"
          :validation-messages="{required: 'The Ticket Name is required'}"
        />
        <FormulateInput
          @validation="validationFname = $event"
          type="textarea"
          name="ticketDescription"
          label="Ticket Description"
          validation="required"
          v-model="form.model.ticketDescription"
          :validation-messages="{required: 'The Ticket Description is required'}"
        />
        <label v-if="!isNewTicket" class="form-custom-label" for="form-status">Status</label>
        <model-list-select :list="REQSTATUS_DATA"
                           v-if="!isNewTicket"
                           v-model="form.model.requestStatusId"
                           id="form-status"
                           option-value="requestStatus_id"
                           option-text="requestStatus_name"
                           :isDisabled="true"
                           placeholder="select one">
        </model-list-select>
        <br v-if="!isNewTicket" />
        <label class="form-custom-label" for="form-priority">Priority</label>
        <model-list-select :list="PRILIST_DATA"
                           v-model="form.model.priorityId"
                           id="form-priority"
                           option-value="priority_id"
                           option-text="priority_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-issuecategory">Issue Category</label>
        <model-list-select :list="ISSUECAT_DATA"
                           v-model="form.model.issueCategoryId"
                           id="form-issuecategory"
                           option-value="issueCategory_id"
                           option-text="issueCategory_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-issuetype">Issue Type</label>
        <model-list-select :list="ISSUETYPE_DATA"
                           v-model="form.model.issueId"
                           id="form-issuetype"
                           option-value="issueType_id"
                           option-text="issueType_name"
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-location">Issue Location</label>
        <model-list-select :list="LOCATION_DATA"
                           v-model="form.model.locationId"
                           id="form-location"
                           option-value="location_id"
                           option-text="location_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-hwasset">Hardware Asset</label>
        <model-list-select :list="ASSET_DATA"
                           v-model="form.model.assetId"
                           id="form-hwasset"
                           option-value="asset_id"
                           option-text="concatData"
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-swasset">Software Asset</label>
        <model-list-select :list="SOFTWARE_DATA"
                           v-model="form.model.softwareId"
                           id="form-swasset"
                           option-value="software_id"
                           option-text="software_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <FormulateInput
          v-if="!isNewTicket"
          type="text"
          name="createdBy"
          label="Created By"
          v-model="form.model.createdBy"
          :disabled="true"
        />
        <FormulateInput
          v-if="!isNewTicket"
          type="text"
          name="assignedTo"
          label="Assigned To"
          v-model="form.model.assignedTo"
          :disabled="true"
        />
        <FormulateInput
          v-if="!isNewTicket"
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
  name: "ticketEdit",
  props: ["ticket_id"],
  data() {
    return {
      isITdepartment: false,
      validationEmail: {},
      validationFname: {},
      validationLname: {},
      validationPhone: {},
      validationPass: {},
      validationPassConfirm: {},
      isNewTicket: true,
      DB_DATA: [],
      LOCATION_DATA: [],
      ASSET_DATA: [],
      SOFTWARE_DATA: [],
      REQSTATUS_DATA: [],
      ISSUETYPE_DATA: [],
      PRILIST_DATA: [],
      ISSUECAT_DATA: [],
      form: {
        model: {
          ticketName: '',
          ticketDescription: '',
          createdById: '',
          createdBy: '',
          assignedTo: '',
          assignedTeam: '',
          locationId: '',
          assetId: '',
          softwareId: '',
          requestStatusId: 1,
          issueId: '',
          priorityId: '',
          issueCategoryId: '',
          teamId: '',
          isResolved: '',
          resolvedId: '',
          resolutionNotes: '',
          createdAt: '',
          updatedAt: '',
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
    validationFormCheck: function () {
      if (this.validationEmail.hasErrors === false &&
        this.validationFname.hasErrors === false &&
        this.validationLname.hasErrors === false &&
        this.validationPhone.hasErrors === false){
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    goBack(){
      if(this.isNewTicket){ this.$router.push('/tickets') } else {
        this.$router.push({
          name: '/tickets/view',
          params: {
            ticket_id: this.ticket_id
          }
        })
      }
    },
    addTicket(){
      this.form.model.createdById = session.getUser().user_id
      if(this.form.model.assetId === ''){this.form.model.assetId = null}
      if(this.form.model.softwareId === ''){this.form.model.softwareId = null}

      console.log(this.form.model.assetId)
      console.log(this.form.model.softwareId)

      axios.post(`${config.api}/api/tickets/create`, this.form.model)
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
          Swal.fire('Error', 'Something went wrong (creating ticket)', 'error')
        })
    },
    updateTicket(){
      const ticketID = this.ticket_id
      axios.put(`${config.api}/api/tickets/update/` + ticketID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The ticket has been updated.',
            'success'
          )
          lumberjack.logAudit(5, 'update', this.ticket_id)
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating ticket)', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/tickets/find/` + this.ticket_id)
        .then((response) => {
          //this.DB_DATA = response.data;
          //console.log(JSON.stringify(this.DB_DATA))
          this.form.model.ticketName = response.data.ticket_title,
          this.form.model.ticketDescription = response.data.ticket_description,
          this.form.model.locationId = response.data.locationId,
          this.form.model.assetId = response.data.assetId,
          this.form.model.softwareId = response.data.softwareId,
          this.form.model.requestStatusId = response.data.requestStatusId,
          this.form.model.priorityId = response.data.priorityId,
          this.form.model.issueId = response.data.issueId,
          this.form.model.issueCategoryId = response.data.issueCategoryId,
          this.form.model.teamId = response.data.teamId,
          this.form.model.isResolved = response.data.is_resolved,
          this.form.model.resolvedId = response.data.resolvedId,
          this.form.model.resolutionNotes = response.data.resolution_notes,
          this.form.model.createdAt = response.data.CREATED_AT,
          this.form.model.closedAt = response.data.CLOSED_AT

          const createdByObj = response.data.createdBy
          const assignedToObj = response.data.assignedUser
          const assignedTeamObj = response.data.team

          if(response.data.created_by !== null) {this.form.model.createdBy = createdByObj.f_name + ' ' + createdByObj.l_name + ' (' + createdByObj.email +  ')'}
          if(response.data.assigned_user !== null) {this.form.model.assignedTo = assignedToObj.f_name + ' ' + assignedToObj.l_name + ' (' + assignedToObj.email +  ')'}
          if(response.data.teamId !== null) {this.form.model.assignedTeam = assignedTeamObj.team_name}

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding ticket)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/locations/findlist`)
        .then((response) => {
          this.LOCATION_DATA = response.data;
          //console.log(response.data)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
      axios.get(`${config.api}/api/assetList/findlist`)
        .then((response) => {
          this.ASSET_DATA = response.data;
          const MERGE_DATA = this.ASSET_DATA.map(obj => ({
            concatData: obj.asset_name + ' (' + obj.serial_number + ')'
          }))
          this.ASSET_DATA = _.merge(this.ASSET_DATA,MERGE_DATA)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading assets)', 'error')
        })
      axios.get(`${config.api}/api/softwareAssets/findlist`)
        .then((response) => {
          this.SOFTWARE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading software)', 'error')
        })
      axios.get(`${config.api}/api/requestStatus/find`)
        .then((response) => {
          this.REQSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading requestStatus)', 'error')
        })
      axios.get(`${config.api}/api/issueType/findlist`)
        .then((response) => {
          this.ISSUETYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading issueType)', 'error')
        })
      axios.get(`${config.api}/api/priorityList/findlist`)
        .then((response) => {
          this.PRILIST_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading priorityList)', 'error')
        })
      axios.get(`${config.api}/api/issueCategory/findlist`)
        .then((response) => {
          this.ISSUECAT_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading issueCategory)', 'error')
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
    if (this.ticket_id !== undefined){
      this.isNewTicket = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
