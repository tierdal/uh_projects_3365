<template>
  <div>
    <h2>About</h2>
    <p>Demo App</p>
    <departments-list />
  </div>
</template>

<script>

import departmentList from "../lists/configuration/departmentList.vue";

//Vue.use(Router);

export default {
  components: {
    'departments-list' : departmentList
  }
}
</script>

<style lang='stylus'>
</style>
