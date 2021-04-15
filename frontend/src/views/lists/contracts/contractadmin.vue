<template>
  <div>
    <h2>Contract Manager</h2>
    <br>
    <contractList-list />
  </div>
</template>

<script>

import contractList from "./contractList.vue";

//Vue.use(Router);

export default {
  components: {
    'contractList-list' : contractList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
