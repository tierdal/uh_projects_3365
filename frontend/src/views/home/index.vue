<template>
  <div>
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        My Dashboard
      </div>
      <!--<h1 class="display-3">Demo</h1>
      <p>Demo System.</p>-->
    </div>
    <div class="buttonRibbon">
      <button class="swal2-styled buttonRibbon-style" v-on:click="addNewTicket">New Ticket</button>
      <button class="swal2-styled buttonRibbon-style" v-on:click="">New Incident</button>
      <button class="swal2-styled buttonRibbon-style" v-on:click="">New Change Request</button>
    </div>
    <dash-admin v-if="isAdmin" />
    <dash-user v-else />
  </div>

</template>

<script>

import dashUser from "./dash-user.vue";
import dashAdmin from "./dash-admin.vue";
import session from "../../utilities/session";

export default {
  components: {
    'dash-user' : dashUser,
    'dash-admin' : dashAdmin
  },
  data() {
    return {
      adminCheck: false
    }
  },
  methods: {
    isAdmin() {
      const role = session.getUser().roleId
      if (role === 1) {
        //non-admin doesnt see stuff
        //console.log('admin')
        return this.adminCheck = true
      } else {
        //console.log('not-admin')
        return this.adminCheck = false
      }
    },
    addNewTicket(){
      this.$router.push('/tickets/edit')
    }
  },
  beforeMount() {
    this.isAdmin()
  }
}
</script>

<style lang='stylus'>
</style>
