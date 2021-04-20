<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Incident Urgency List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewIncidentUrgency">Add New Incident Urgency</button>
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
          initialSortBy: {field: 'incidentUrgency_id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [10, 25, 50, 100],
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
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
//import { mapActions } from 'vuex'
//import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
//import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
//import _ from "lodash";
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      TEAMS_DATA: [],
      myAPI: `${config.api}/api/incidentUrgency`,
      dataFields: [{
        label: 'id',
        field: 'incidentUrgency_id',
        type: 'number'
      },{
        label: 'name',
        field: 'incidentUrgency_name'
      },{
        label: 'SLA',
        field: 'slaName'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      //place holder for now
      this.$router.push({
        name: '/incidentUrgency/edit',
        params: {
          incidentUrgency_id: params.row.incidentUrgency_id
        }
      })
    },
    addNewIncidentUrgency(){
      //this.$router.push('/manage/vendors/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/incidentUrgency/find`)
        .then((response) => {
          this.DB_DATA = response.data;
          this.DB_DATA.forEach( obj => this.renameKey(obj, 'slaList.sla_name','slaName'))
          console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went with incidentUrgency', 'error')
        })
    },  renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
