<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item"><span class="navbar-brand">Frontend</span></li>
      <li class="nav-item"><router-link class="nav-link" to="/home">Home</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/tickets">Tickets</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/contact">Contact</router-link></li>
      <li v-if="adminCheck" class="nav-item"><a class="nav-link" href="#">Admin</a>
        <ul class="navbar-nav-submenu">
          <li class="nav-item-submenu"><router-link class="nav-link" to="/useradmin">User Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/configuration">Configuration</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/home">Foo</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/contact">Bar</router-link></li>
        </ul>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/account">My Account</router-link>
      </li>
      <li class="nav-item">
        <span
          class="nav-link custom-link"
          @click="confirmLogout">Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import session from "../../utilities/session";

export default {
  name: 'HeaderTemplate',
  data() {
    return {
      adminCheck: false
    }
  },
  methods: {
    ...mapActions(['logout']),
    isAdmin(){
      const role = session.getUser().roleId
      if (role === 1){
        //non-admin doesnt see stuff
        //console.log('admin')
        return this.adminCheck = true
      } else {
        //console.log('not-admin')
        return this.adminCheck = false
      }
    },
    confirmLogout() {
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Stay Logged In',
        confirmButtonText: 'Logout',
      }).then(result => {
        if (result.isConfirmed) {
          this.$router.push('/auth/logout')
          //this.logout()
        }
      })
    },
  },
  beforeMount() {
    this.isAdmin()
  }
}
</script>

<style lang='stylus'>
.custom-link {
  cursor: pointer;
}
</style>
