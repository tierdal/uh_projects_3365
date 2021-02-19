<template>
  <div>
    <h2>About</h2>
    <p>Demo App</p>
    <departments-list />
    <br>
    <users-list />
  </div>
</template>

<script>

import departmentList from "../lists/departments/departmentList.vue";
import userList from "../lists/userList.vue";

//Vue.use(Router);

export default {
  components: {
    'departments-list' : departmentList,
    'users-list' : userList
  }
}
</script>

<style lang='stylus'>
</style>
