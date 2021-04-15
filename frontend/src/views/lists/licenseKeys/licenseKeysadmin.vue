<template>
  <div>
    <h2>License Keys Manager</h2>
    <br>
    <licenseKeysList-list />
  </div>
</template>

<script>

import licenseKeysList from "./licenseKeysList.vue";

//Vue.use(Router);

export default {
  components: {
    'licenseKeysList-list' : licenseKeysList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
