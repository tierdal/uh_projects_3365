<template>
  <div>
    <h2>About</h2>
    <p>Demo App</p>
    <departments-list />
    <issue-list />
  </div>
</template>

<script>

import departmentList from "../lists/departments/departmentList.vue";
import issueTypeList from "../lists/issue/issueTypeList.vue";

//Vue.use(Router);

export default {
  components: {
    'departments-list' : departmentList,
    'issue-list' : issueTypeList
  }
}
</script>

<style lang='stylus'>
</style>
