<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-center">
      Report Center
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>
  </div>

</template>

<script>
import {VueGoodTable} from "vue-good-table";

export default {
  name: "reportCenter",
  components: {
    'vue-good-table': VueGoodTable,
  },
  data() {
    return {
      DB_DATA: [{
        'report_id' : '1',
        'report_title': 'Ticket Reports',
        'report_url': 'ticketsreport'
      },{
        'report_id' : '2',
        'report_title': 'Incident Reports',
        'report_url': 'incidentsreport'
      },{
        'report_id' : '3',
        'report_title': 'User Reports',
        'report_url': 'usersreport'
      },{
        'report_id' : '4',
        'report_title': 'Hardware Asset Reports',
        'report_url': 'hwassetsreport'
      },{
        'report_id' : '5',
        'report_title': 'Software Asset Reports',
        'report_url': 'swassetsreport'
      }],
      dataFields: [{
        label: 'Report Title',
        field: 'report_title'
      }]
    };
  },
  methods: {
    onRowDoubleClick(params){
      const reportURL = params.row.report_url
      this.$router.push('/reports/' + reportURL)
    }
  }
}
</script>

<style scoped>

</style>
