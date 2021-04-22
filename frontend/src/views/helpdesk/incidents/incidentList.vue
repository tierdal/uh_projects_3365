<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Incident List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewIncident">Add New Incident</button>
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
          initialSortBy: {field: 'incident_id', type: 'desc'}
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

import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'
import _ from 'lodash';
import session from "../../../utilities/session";

export default {
  name: "incidentList",
  props: ["is_dash"],
  data() {
    return {
      DB_DATA: [],
      is_helpdesk: 'false',
      CREATEDBY: [],
      FULL_DATA: [],
      myAPI: `${config.api}/api/incidents`,
      form: {
        model: {
          createdById: '',
          isResolved: '',
        }
      },
      dataFields: [{
        label: 'ID',
        field: 'incident_id',
        type: 'number'
      },{
        label: 'Name',
        field: 'incident_name'
      },{
        label: 'urgency',
        field: 'incidentUrgency.incidentUrgency_name'
      },{
        label: 'type',
        field: 'incidentType.incidentType_name'
      },{
        label: 'Status',
        field: 'incidentStatus.incidentStatus_name'
      },{
        label: 'Created By',
        field: 'createdBy.email'
      },{
        label: 'Time Created',
        field: 'CREATED_AT'
      }],
      dataFieldsUser: [{
        label: 'ID',
        field: 'incident_id',
        type: 'number'
      },{
        label: 'Name',
        field: 'incident_name'
      },{
        label: 'Created By',
        field: 'createdBy.email'
      },{
        label: 'Status',
        field: 'incidentStatus.incidentStatus_name'
      },{
        label: 'Type',
        field: 'incidentType.incidentType_name'
      },{
        label: 'Urgency',
        field: 'incidentUrgency.incidentUrgency_name'
      },{
        label: 'Time Created',
        field: 'CREATED_AT'
      }]
    };
  },
  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {

    onRowDoubleClick(params) {
      this.$router.push({
        name: '/helpdesk/incidents/view',
        params: {
          incident_id: params.row.incident_id
        }
      })
    },
    addNewIncident() {
      this.$router.push('/helpdesk/incidents/edit')
    },
    loadData() {
      if (this.is_helpdesk) {
        axios.get(`${config.api}/api/incidents/findall`)
          .then((response) => {
            this.DB_DATA = response.data;
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (Loading Incident List)', 'error')
          })
      } else {
        this.form.model.createdById = session.getUser().user_id
        axios.get(`${config.api}/api/incidents/findreport`, {params: this.form.model})
          .then((response) => {
            this.DB_DATA = response.data;
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (Loading Incident List)', 'error')
          })
      }
    },
    isHelpdesk() {
      const department = session.getUser().departmentId
      if (department === 1) {
        this.is_helpdesk = true
      } else {
        this.is_helpdesk = false
      }
    },
  },
  beforeMount() {
    this.loadData();
  }
};

</script>

<style scoped>

</style>
