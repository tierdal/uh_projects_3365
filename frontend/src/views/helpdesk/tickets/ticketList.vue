<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Ticket List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewTicket">Add New Ticket</button>
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        v-if="is_helpdesk"
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
      <vue-good-table
        v-if="!is_helpdesk"
        :columns="dataFieldsUser"
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

import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'
import _ from 'lodash';
import session from "../../../utilities/session";

export default {
  name: "ticketList",
  props: ["is_dash"],
  data() {
    return {
      DB_DATA: [],
      is_helpdesk: 'false',
      myAPI: `${config.api}/api/tickets`,
      form: {
        model: {
          createdById: '',
          isResolved: '',
        }
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
        field: 'createdBy.email'
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
      }],
      dataFieldsUser: [{
        label: 'ID',
        field: 'ticket_id',
        type: 'number'
      },{
        label: 'Title',
        field: 'ticket_title'
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
        label: 'Time Created',
        field: 'CREATED_AT'
      }]
    };
  },
  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {

    onRowDoubleClick(params){
      this.$router.push({
        name: '/helpdesk/tickets/view',
        params: {
          ticket_id: params.row.ticket_id
        }
      })
    },
    addNewTicket(){
      this.$router.push('/helpdesk/tickets/edit')
    },
    loadData(){
      if(this.is_helpdesk) {
        axios.get(`${config.api}/api/tickets/findall`)
          .then((response) => {
            this.DB_DATA = response.data;
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (Loading Ticket List)', 'error')
          })
      } else {
        this.form.model.createdById = session.getUser().user_id
        axios.get(`${config.api}/api/tickets/findreport`, {params: this.form.model})
          .then((response) => {
            this.DB_DATA = response.data;
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (Loading Ticket List)', 'error')
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
    this.isHelpdesk()
    this.loadData();
  }
};

</script>

<style scoped>

</style>
