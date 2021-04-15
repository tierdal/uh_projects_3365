<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item"><router-link to="/home"><span class="navbar-brand"><img src="src/assets/img/gulf_logo.png" alt="logo" class="navbar-logo"></span></router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/home">Home</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/tickets">Tickets</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/faq">FAQ</router-link></li>
      <li v-if="helpdeskCheck" class="nav-item"><a class="nav-link" href="#">Management</a>
        <ul class="navbar-nav-submenu">
          <li class="nav-item-submenu"><router-link class="nav-link" to="/manage/faq">FAQ Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/manage/locations">Location Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/vendorList">Vendor Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/contractList">Contract Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/softwareAssetsList">Software Assets Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/licenseKeysList">License Keys Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/assetList">Asset Manager</router-link></li>
        </ul>
      </li>
      <li v-if="adminCheck" class="nav-item"><a class="nav-link" href="#">Admin</a>
        <ul class="navbar-nav-submenu">
          <li class="nav-item-submenu"><router-link class="nav-link" to="/useradmin">User Manager</router-link></li>
          <li class="nav-item-submenu"><router-link class="nav-link" to="/configuration">Configuration</router-link></li>
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
      adminCheck: false,
      helpdeskCheck: false
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
    isITdepartmentCheck(){
      const department = session.getUser().departmentId
      if (department === 1){
        return this.helpdeskCheck = true
      } else {
        return this.helpdeskCheck = false
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
    this.isITdepartmentCheck()
  }
}
</script>

<style lang='stylus'>
.custom-link {
  cursor: pointer;
}
</style>
