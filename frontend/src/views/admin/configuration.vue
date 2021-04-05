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
        <issueType-list />
      </v-tab>

      <v-tab title="Shipping Methods List">
        <shippingMethods-list />
      </v-tab>

      <v-tab title="Software Status List">
        <softwareStatus-list />
      </v-tab>

      <v-tab title="Teams List">
        <teams-list />
      </v-tab>

      <v-tab title="Issue Category List">
        <issueCategory-list />
      </v-tab>

      <v-tab title="Request Status List">
        <requestStatus-list />
      </v-tab>

    </vue-tabs>
  </div>
</template>

<script>
import departmentList from "../lists/configuration/departmentList.vue";
import statusList from "../lists/configuration/statusList.vue";
import issueTypeList from "../lists/configuration/issueTypeList.vue";
import shippingMethodsList from "../lists/configuration/shippingMethodsList.vue";
import softwareStatusList from "../lists/configuration/softwareStatusList.vue";
import teamList from "../lists/configuration/teamList.vue";
import issueCategoryList from "../lists/configuration/issueCategoryList.vue";
import requestStatusList from "../lists/configuration/requestStatusList.vue";
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  components: {
    'departments-list' : departmentList,
    'status-list' : statusList,
    'issueType-list' : issueTypeList,
    'shippingMethods-list' : shippingMethodsList,
    'softwareStatus-list' : softwareStatusList,
    'teams-list' : teamList,
    'issueCategory-list' : issueCategoryList,
    'requestStatus-list' : requestStatusList,
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
