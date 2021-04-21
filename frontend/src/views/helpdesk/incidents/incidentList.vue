<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Incident List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewTicket">Add New Incident</button>
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="FULL_DATA"
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

export default {
  name: "incidentList",
  data() {
    return {
      DB_DATA: [],
      CREATEDBY: [],
      FULL_DATA: [],
      myAPI: `${config.api}/api/incidents`,
      dataFields: [{
        label: 'ID',
        field: 'incident_id',
        type: 'number'
      },{
        label: 'Name',
        field: 'incident_name'
      },{
        label: 'type',
        field: 'incident_typeId'
      },{
        label: 'description',
        field: 'incident_description'
      },{
        label: 'urgency',
        field: 'incidentUrgencyId'
      },{
        label: 'created by',
        field: 'incident_createdBy'
      },{
        label: 'assinged user',
        field: 'incident_assignedUser'
      },{
        label: 'Location Created',
        field: 'incident_location'
      },{
        label: 'Status',
        field: 'incidentStatusId'
      },{
        label: 'Time Created',
        field: 'CREATED_AT'
      },{
        label: 'Team Assigned',
        field: 'incident_assignedTeam'
      }]
    };
  },
  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {

    onRowDoubleClick(params){
      this.$router.push({
        name: '/helpdesk/incidents/view',
        params: {
          incident_id: params.row.incident_id
        }
      })
    },
    addNewTicket(){
      this.$router.push('/helpdesk/incidents/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/incidents/findall`)
        .then((response) => {
          this.DB_DATA = response.data;
          // this.CREATEDBY = this.DB_DATA.map(obj => ({
          //   full_name: obj.createdBy.f_name + ' ' + obj.createdBy.l_name
          // }))
          // this.FULL_DATA = _.merge(this.DB_DATA,this.CREATEDBY)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading Incident List)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadData();
  }
};

</script>

<style scoped>

</style>
