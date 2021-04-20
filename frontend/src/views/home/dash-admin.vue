<template>
  <div>
    <div slot="table-actions">
    </div>
    <vue-good-table
      :columns="dataFieldsDash"
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
</template>

<script>

import axios from '../../utilities/axios';
import config from '../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'
import session from "../../utilities/session";

export default {
  name: "dash-admin",
  data() {
    return {
      DB_DATA: [],
      form: {
        model: {
          createdById: '',
          isResolved: '',
        }
      },
      dataFieldsDash: [{
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
    loadData(){
      this.form.model.isResolved = false
      axios.get(`${config.api}/api/tickets/findreport`, {params: this.form.model})
        .then((response) => {
          this.DB_DATA = response.data;
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
