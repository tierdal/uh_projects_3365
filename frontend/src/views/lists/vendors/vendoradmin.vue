<template>
  <div>
    <h2>Vendor Manager</h2>
    <br>
    <vendorList-list />
  </div>
</template>

<script>

import vendorList from "./vendorList.vue";

//Vue.use(Router);

export default {
  components: {
    'vendorList-list' : vendorList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
