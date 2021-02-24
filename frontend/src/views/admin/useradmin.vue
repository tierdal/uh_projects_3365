<template>
  <div>
    <h2>User Manager</h2>
    <br>
    <users-list />
  </div>
</template>

<script>

import userList from "../lists/users/userList.vue";

//Vue.use(Router);

export default {
  components: {
    'users-list' : userList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
