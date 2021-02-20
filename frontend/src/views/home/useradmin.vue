<template>
  <div>
    <h2>User Manager</h2>
    <br>
    <users-list />
  </div>
</template>

<script>

import userList from "../lists/userList.vue";

//Vue.use(Router);

export default {
  components: {
    'users-list' : userList
  }
}
</script>

<style lang='stylus'>
</style>
