<template>
  <div>
    <h2>Location Manager</h2>
    <br>
    <locationList-list />
  </div>
</template>

<script>

import locationList from "./locationList.vue";

//Vue.use(Router);

export default {
  components: {
    'locationList-list' : locationList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
