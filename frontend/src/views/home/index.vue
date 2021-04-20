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
    <br>
    <div class="dashitem" v-if="!is_helpdesk" >
      <div class="dashname">My Open tickets</div>
      <div class="dashtable">
        <dash-user />
      </div>
    </div>
    <div class="dashitem" v-if="is_helpdesk" >
      <div class="dashname">All Open Tickets</div>
      <div class="dashtable">
        <dash-admin />
      </div>
    </div>
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
      is_helpdesk: false
    }
  },
  methods: {
    isHelpdesk() {
      const department = session.getUser().departmentId
      if (department === 1) {
        this.is_helpdesk = true
      } else {
        this.is_helpdesk = false
      }
    },
    addNewTicket(){
      this.$router.push('/helpdesk/tickets/edit')
    }
  },
  beforeMount() {
    this.isHelpdesk()
  }
}
</script>

<style lang='stylus'>
.dashname {
  font-size: large
}
</style>
