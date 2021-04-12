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

      <v-tab title="Asset Type List">
        <assetType-list />
      </v-tab>

      <v-tab title="Location Type List">
        <locationType-list />
      </v-tab>

      <v-tab title="Asset Status List">
        <assetStatus-list />
      </v-tab>

      <v-tab title="FAQ Category List">
        <faqCategory-list />
      </v-tab>

      <v-tab title="SLA List">
        <slaList-list />
      </v-tab>

      <v-tab title="Install Status List">
        <installStatusList-list />
      </v-tab>

      <v-tab title="Shipping Status List">
        <shippingStatusList-list />
      </v-tab>

      <v-tab title="Payment Terms List">
        <paymentTermsList-list />
      </v-tab>

      <v-tab title="Resolved List">
        <resolvedList-list />
      </v-tab>

      <v-tab title="Change Request Type List">
        <changeRequestTypeList-list />
      </v-tab>

      <v-tab title="Change Request Status List">
        <changeRequestStatusList-list />
      </v-tab>

      <v-tab title="Incident Status List">
        <incidentStatusList-list />
      </v-tab>

      <v-tab title="Priority List">
        <PriorityList-list />
      </v-tab>

      <v-tab title="Priority List">
        <PriorityList-list />
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
import assetTypeList from "../lists/configuration/assetTypeList.vue";
import locationTypeList from "../lists/configuration/locationTypeList.vue";
import assetStatusList from "../lists/configuration/assetStatusList.vue";
import faqCategoryList from "../lists/faq/faqCategoryList.vue";
import slaListList from "../lists/configuration/slaListList.vue";
import installStatusListList from "../lists/configuration/installStatusListList.vue";
import shippingStatusList from "../lists/configuration/shippingStatusList.vue";
import paymentTermsList from "../lists/configuration/paymentTermsList.vue";
import resolvedList from "../lists/configuration/resolvedListList.vue";
import changeRequestTypeList from "../lists/configuration/changeRequestTypeList.vue";
import changeRequestStatusList from "../lists/configuration/changeRequestStatusList.vue";
import incidentStatusList from "../lists/configuration/incidentStatusList.vue";
import PriorityList from "../lists/configuration/PriorityListList.vue";
import softwareStatus from "../lists/configuration/softwareStatus.vue";
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
    'assetType-list' : assetTypeList,
    'locationType-list' : locationTypeList,
    'assetStatus-list' : assetStatusList,
    'faqCategory-list' : faqCategoryList,
    'slaList-list' : slaListList,
    'installStatusList-list' : installStatusListList,
    'shippingStatusList-list' : shippingStatusList,
    'paymentTermsList-list' : paymentTermsList,
    'resolvedList-list' : resolvedList,
    'changeRequestTypeList-list' : changeRequestTypeList,
    'changeRequestStatusList-list' : changeRequestStatusList,
    'incidentStatusList-list' : incidentStatusList,
    'PriorityList-list' : PriorityList,
    'PriorityList-list' : PriorityList,
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
