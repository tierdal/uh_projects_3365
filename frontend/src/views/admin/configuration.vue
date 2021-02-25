<template>
  <div>
    <h2>Helpdesk Configuration</h2>
    <br>
    <div class="mainForm configrow1">
      <div class="editForm-left">
        <departments-list />
      </div>
      <div class="editForm-right">
        <status-list />
      </div>
    </div>
    <br>
    <div class="mainForm configrow2">
      <div class="editForm-left">
        <issuetype-list />
      </div>
      <div class="editForm-right">
        put next form here
      </div>
    </div>
  </div>
</template>

<script>
import departmentList from "../lists/configuration/departmentList.vue";
import statusList from "../lists/configuration/statusList.vue";
import issueTypeList from "../lists/configuration/issueTypeList.vue";

export default {
  components: {
    'departments-list' : departmentList,
    'status-list' : statusList,
    'issuetype-list' : issueTypeList
  }
}
</script>


<style lang='stylus'>
h2 {
  text-align: center
}
</style>
