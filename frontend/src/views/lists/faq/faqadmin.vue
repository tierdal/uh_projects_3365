<template>
  <div>
    <h2>Faq Manager</h2>
    <br>
    <faqList-list />
  </div>
</template>

<script>

import faqList from "./faqList.vue";

//Vue.use(Router);

export default {
  components: {
    'faqList-list' : faqList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
