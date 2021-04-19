<template>
  <div>
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        Ticket Report
      </div>
    </div>

    <badger-accordion>
      <badger-accordion-item>
        <template slot="header">Query Parameters</template>
        <template slot="content">
          <br>
          <form class="swal2-form mainForm">
            <div class="editForm-left">
              <label class="form-custom-label" for="form-status">Status</label>
              <model-list-select :list="REQSTATUS_DATA"
                                 v-model="form.model.requestStatusId"
                                 id="form-status"
                                 option-value="requestStatus_id"
                                 option-text="requestStatus_name"
                                 placeholder="select one">
              </model-list-select>
              <br />
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
              <br />
              <label class="form-custom-label" for="form-createdby">Created By</label>
              <model-list-select :list="USER_DATA"
                                 v-model="form.model.createdById"
                                 id="form-createdby"
                                 option-value="user_id"
                                 option-text="email"
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
              <label class="form-custom-label" for="form-assignedto">Assigned To</label>
              <model-list-select :list="USER_DATA"
                                 v-model="form.model.assignedToId"
                                 id="form-assignedto"
                                 option-value="user_id"
                                 option-text="email"
                                 placeholder="select one">
              </model-list-select>
              <br />
              <label class="form-custom-label" for="form-assignedteam">Assigned Team</label>
              <model-list-select :list="TEAM_DATA"
                                 v-model="form.model.teamId"
                                 id="form-assignedteam"
                                 option-value="team_id"
                                 option-text="team_name"
                                 placeholder="select one">
              </model-list-select>
              <br />
            </div>
          </form>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button class="swal2-editform swal2-styled" v-on:click="submitQuery">Submit Query</button>
        <button class="swal2-editform swal2-styled" v-on:click="clearForm">Clear Form</button>
      </div>
    </div>

    <br />

    <div class="reportBody">
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
          initialSortBy: {field: 'ticket_id', type: 'desc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 5, 10, 25, 50, 100],
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
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import {ModelListSelect, ModelSelect} from "vue-search-select";
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: "ticketsReport",
  components: {
    ModelSelect,
    ModelListSelect,
    BadgerAccordion,
    BadgerAccordionItem,
    VueGoodTable
  },
  data() {
    return {
      DB_DATA: [],
      LOCATION_DATA: [],
      ASSET_DATA: [],
      SOFTWARE_DATA: [],
      REQSTATUS_DATA: [],
      ISSUETYPE_DATA: [],
      PRILIST_DATA: [],
      ISSUECAT_DATA: [],
      TEAM_DATA: [],
      USER_DATA: [],
      form: {
        model: {
          ticketName: '',
          ticketDescription: '',
          createdById: '',
          createdBy: '',
          assignedToId: '',
          assignedTo: '',
          assignedTeam: '',
          locationId: '',
          assetId: '',
          softwareId: '',
          requestStatusId: '',
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
      dataFields: [{
        label: 'ID',
        field: 'ticket_id',
        type: 'number'
      },{
        label: 'Title',
        field: 'ticket_title'
      },{
        label: 'Created By',
        field: 'full_name'
      },{
        label: 'Status',
        field: 'requestStatus.requestStatus_name'
      },{
        label: 'Priority',
        field: 'prioritylist.priority_name'
      },{
        label: 'Type',
        field: 'issueType.issueType_name'
      },{
        label: 'Category',
        field: 'issueCategory.issueCategory_name'
      },{
        label: 'Closed',
        field: 'is_resolved'
      },{
        label: 'Time Created',
        field: 'CREATED_AT'
      }]
    };
  },
  methods:{
    goBack(){
      this.$router.push('/reports')
    },
    clearForm(){},
    submitQuery(){},
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
    onRowDoubleClick(){},
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
      axios.get(`${config.api}/api/teams/find`)
        .then((response) => {
          this.TEAM_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading teams)', 'error')
        })
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.USER_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading users)', 'error')
        })
    },
  },
  beforeMount() {
    this.loadFields()
  }
}
</script>

<style scoped>

</style>
