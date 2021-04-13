<template>
  <div>
    Admin Dash
    <ticket-list />
  </div>
</template>

<script>
import ticketList from "../helpdesk/tickets/ticketList.vue";
export default {
  name: "dash-admin",
  components: {
    'ticket-list': ticketList
  }
}
</script>

<style scoped>

</style>
