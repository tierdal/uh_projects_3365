<template>
  <div>
    <h2>Helpdesk Configuration</h2>
    <br>
    <vue-tabs active-tab-color="#2778c4"
              active-text-color="white"
              type="pills"
              :start-index="1"
              direction="vertical"
    >
      <v-tab title="Department List">
        <departments-list />
      </v-tab>

      <v-tab title="Status List">
        <status-list />
      </v-tab>

      <v-tab title="Issue Type List">
        <issuetype-list />
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import departmentList from "../lists/configuration/departmentList.vue";
import statusList from "../lists/configuration/statusList.vue";
import issueTypeList from "../lists/configuration/issueTypeList.vue";
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  components: {
    'departments-list' : departmentList,
    'status-list' : statusList,
    'issuetype-list' : issueTypeList,
    VueTabs,
    VTab
  }
}
</script>


<style lang='stylus'>
h2 {
  text-align: center
}
</style>
