<template>
  <div>
    <h2>Software Assets Manager</h2>
    <br>
    <softwareAssetsList-list />
  </div>
</template>

<script>

import softwareAssetsList from "./softwareAssetsList.vue";

//Vue.use(Router);

export default {
  components: {
    'softwareAssetsList-list' : softwareAssetsList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
