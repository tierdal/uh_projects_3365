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
      <v-tab title="Ticket Category List">
        <issueCategory-list />
      </v-tab>
      <v-tab title="Ticket Status List">
        <requestStatus-list />
      </v-tab>
      <v-tab title="Ticket Priority List">
        <priorityList-list />
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
      <v-tab title="Incident Type List">
        <incidentTypeList-list />
      </v-tab>
      <v-tab title="Incident Urgency List">
        <incidentUrgencyList-list />
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import departmentList from "./configuration/departmentList.vue";
import statusList from "./configuration/statusList.vue";
import issueTypeList from "../management/Issues/issueTypeList.vue";
import shippingMethodsList from "./configuration/shippingMethodsList.vue";
import softwareStatusList from "./configuration/softwareStatusList.vue";
import teamList from "./configuration/teamList.vue";
import issueCategoryList from "./configuration/issueCategoryList.vue";
import requestStatusList from "./configuration/requestStatusList.vue";
import assetTypeList from "./configuration/assetTypeList.vue";
import locationTypeList from "./configuration/locationTypeList.vue";
import assetStatusList from "./configuration/assetStatusList.vue";
import faqCategoryList from "./configuration/faqCategoryList.vue";
import slaListList from "./configuration/slaList.vue";
import installStatusListList from "./configuration/installStatusList.vue";
import shippingStatusList from "./configuration/shippingStatusList.vue";
import paymentTermsList from "./configuration/paymentTermsList.vue";
import resolvedList from "./configuration/resolvedList.vue";
import changeRequestTypeList from "./configuration/changeRequestTypeList.vue";
import changeRequestStatusList from "./configuration/changeRequestStatusList.vue";
import incidentStatusList from "./configuration/incidentStatusList.vue";
import priorityList from "./configuration/priorityList.vue";
import incidentTypeList from "./configuration/incidentTypeList.vue";
import incidentUrgencyList from "./configuration/incidentUrgencyList.vue";
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
    'priorityList-list' : priorityList,
    'incidentTypeList-list' : incidentTypeList,
    'incidentUrgencyList-list' : incidentUrgencyList,
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
