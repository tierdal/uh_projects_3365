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

export default {
  name: "ticketList",
  data() {
    return {
      DB_DATA: [],
      CREATEDBY: [],
      FULL_DATA: [],
      myAPI: `${config.api}/api/tickets`,
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
  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {

    onRowDoubleClick(params){
      this.$router.push({
        name: '/tickets/view',
        params: {
          ticket_id: params.row.ticket_id
        }
      })
    },
    addNewTicket(){
      this.$router.push('/tickets/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/tickets/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          this.CREATEDBY = this.DB_DATA.map(obj => ({
            full_name: obj.createdBy.f_name + ' ' + obj.createdBy.l_name
          }))
          this.FULL_DATA = _.merge(this.DB_DATA,this.CREATEDBY)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (Loading Ticket List)', 'error')
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
