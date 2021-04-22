<template>
  <div>
    <h2>Friendly Asked Questions</h2>
    <br>
    <vue-tabs active-tab-color="#2778c4"
              active-text-color="white"
              type="pills"
              :start-index="1"
              direction="vertical"
    >
      <v-tab v-for="item in DB_DATA" :key="item.faq_id">
        <div slot="title">{{item.faq_title}}</div>
        Category: {{item.faqCategory.faq_category_description}} <br><br>
        Solution: {{item.faq_body}}
      </v-tab>
    </vue-tabs>
    <br />
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import axios from "../../utilities/axios";
import config from "../../config";
import Swal from "sweetalert2";


export default {
  data() {
    return {
      DB_DATA: [],
      tabs: []
    }
  },
  components: {
    VueTabs,
    VTab
  },
  methods: {
    loadData(){
      axios.get(`${config.api}/api/faqList/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
.left-vertical-tabs {
  width: 40%
}
</style>
