<template>
  <div>
    <h2>Helpdesk Configuration</h2>
    <br>
    <div class="mainForm">
      <div class="editForm-left">
        <departments-list />
      </div>
      <div class="editForm-right">
        <status-list />
      </div>
    </div>
  </div>
</template>

<script>
import departmentList from "../lists/configuration/departmentList.vue";
import statusList from "../lists/configuration/statusList.vue";

export default {
  components: {
    'departments-list' : departmentList,
    'status-list' : statusList
  }
}
</script>


<style lang='stylus'>
h2 {
  text-align: center
}
</style>
