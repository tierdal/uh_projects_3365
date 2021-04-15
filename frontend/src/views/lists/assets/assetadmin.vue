<template>
  <div>
    <h2>Asset Manager</h2>
    <br>
    <assetList-list />
  </div>
</template>

<script>

import assetList from "./assetList.vue";

//Vue.use(Router);

export default {
  components: {
    'assetList-list' : assetList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
