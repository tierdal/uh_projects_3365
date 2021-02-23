<template>
  <div>
      <form class="swal2-form mainForm">
        <div class="editForm-left">
          Username
            <input
              v-validate="'required|min:3|max:36'"
              id="form-email"
              class="swal2-input"
              type="text"
              placeholder="Username"
              autocomplete="email"
              name="email"
              v-model="form.model.email">
            <span
              v-show="errors.has('email')"
              class="invalid-feedback"
              v-html="errors.first('email')" />
          First Name
            <input
              id="form-fname"
              class="swal2-input"
              placeholder="First Name"
              type="text"
              name="f_name"
              v-model="form.model.f_name">
            <span
              v-show="errors.has('f_name')"
              class="invalid-feedback"
              v-html="errors.first('f_name')" />
          Last Name
            <input
              id="form-lname"
              class="swal2-input"
              placeholder="Last Name"
              type="text"
              name="l_name"
              v-model="form.model.l_name">
            <span
              v-show="errors.has('l_name')"
              class="invalid-feedback"
              v-html="errors.first('l_name')" />
          Phone
            <input
              id="form-phone"
              class="swal2-input"
              type="text"
              placeholder="Phone"
              name="phone"
              v-model="form.model.phone">
            <span
              v-show="errors.has('phone')"
              class="invalid-feedback"
              v-html="errors.first('phone')" />
          <input
            type="checkbox"
            id="form-isapprover"
            name="is_approver"
            class="swal2-checkbox"
            v-model="form.model.is_approver"> Approver
        </div>
        <div class="editForm-right">
          Department
            <select
              v-model="form.model.departmentId"
              id="form-department"
              name="department_id"
              class="swal2-input">
              <option
                v-for="department in DEPT_DATA"
                v-bind:value="department.department_id">
                {{ department.department_description }}
              </option>
            </select>
          Role
            <select
              v-model="form.model.roleId"
              id="form-role"
              name="role_id"
              class="swal2-input">
              <option
                v-for="option in ROLE_DATA"
                v-bind:value="option.role_id">
                {{ option.role_description }}
              </option>
            </select>
          Status
            <select
              v-model="form.model.statusId"
              id="form-status"
              name="status_id"
              class="swal2-input">
              <option
                v-for="status in STATUS_DATA"
                v-bind:value="status.status_id">
                {{ status.status_description }}
              </option>
            </select><br />
          <span v-if="isNewUser">Password</span>
          <input
            v-if="isNewUser"
            v-validate="'required|min:6|max:36'"
            type="password"
            id="form-password"
            name="password"
            class="swal2-input"
            placeholder="Password"
            v-model="form.model.password">
          <span
            v-show="errors.has('password')"
            class="invalid-feedback"
            v-html="errors.first('password')" />
          <span v-if="isNewUser">Confirm Password</span>
          <input
            v-if="isNewUser"
            id="form-confirmpassword"
            class="swal2-input"
            type="password"
            autocomplete="new-password"
            placeholder="Confirm Password"
            v-model="form.model.confirmPassword"
            name="confirmPassword">
          <span
            v-show="errors.has('confirmPassword')"
            class="invalid-feedback"
            v-html="errors.first('confirmPassword')" />
        </div>
      </form>
    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="isNewUser" class="swal2-editform swal2-styled addNewButton" :disabled="errors.any()" v-on:click="addUser">Add New User</button>
        <button v-if="!isNewUser" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteUser">Delete User</button>
        <button v-if="!isNewUser" class="swal2-editform swal2-styled updateButton" v-on:click="updateUser">Update User</button>
      </div>
    </div>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../utilities/axios';
import config from '../../../config';
import Swal from 'sweetalert2'
import {mapActions} from "vuex";

export default {
  props: ["user_id"],
  data() {
    return {
      isNewUser: 'true',
      DB_DATA: [],
      DEPT_DATA: [],
      ROLE_DATA: [],
      STATUS_DATA: [],
      form: {
        model: {
          password: '',
          confirmPassword: '',
          email: '',
          f_name: '',
          l_name: '',
          phone: '',
          departmentId: '',
          roleId: '',
          is_approver: '',
          statusId: '',
        },
      },
    };
  },
  components: {
  },
  methods: {
    ...mapActions(['register']),
    goBack(){
      this.$router.push('/useradmin')
    },
    addUser(){
      this.$validator.validateAll().then(res => {
        if (res) {
          this.register(this.form.model)
        } else {
          Swal.fire({
            title: 'Not so fast!',
            text: 'Please provide required data in valid format',
            icon: 'warning',
          })
        }
      })
    },
    updateUser(){
      const userID = this.user_id
      axios.put(`${config.api}/api/users/update/` + userID, this.form.model)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The user has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteUser(){
      const userID = this.user_id
      axios.delete(`${config.api}/api/users/delete/` + userID)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The user has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/users/find/` + this.user_id)
        .then((response) => {
          this.DB_DATA = response.data;
          //this.dataLength = response.data.length;
          //console.log('Status: ' + response.status + ' ' + response.statusText)
          //console.log('Headers:')
          //console.log(response.headers)
          //console.log('Config:')
          //console.log(response.config)
          //console.log('Data:')
          //console.log(response.data)
          //console.log(JSON.stringify(response.data.length))
          this.form.model.email = response.data.email,
          this.form.model.f_name = response.data.f_name,
          this.form.model.l_name = response.data.l_name,
          this.form.model.phone = response.data.phone,
          this.form.model.departmentId = response.data.department.department_id,
          this.form.model.roleId = response.data.role.role_id,
          this.form.model.statusId = response.data.status.status_id,
          this.form.model.is_approver = response.data.is_approver
          //console.log(JSON.stringify(this.DB_DATA))
          //console.log('Dept: ' + this.departmentId + ', Role: ' + this.roleId + ', Status: ' + this.statusId)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/departments/find`)
        .then((response) => {
          this.DEPT_DATA = response.data;
          //console.log(JSON.stringify(this.DEPT_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
      axios.get(`${config.api}/api/roles/find`)
        .then((response) => {
          this.ROLE_DATA = response.data;
          //console.log(JSON.stringify(this.ROLE_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
      axios.get(`${config.api}/api/status/find`)
        .then((response) => {
          this.STATUS_DATA = response.data;
          //console.log(JSON.stringify(this.STATUS_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    //console.log(this.user_id)
    this.loadFields()
    if (this.user_id !== undefined){
      this.isNewUser = false
      this.loadData()
    }
    //console.log(this.isNewUser)
  },
  mounted() {
    //console.log(this.email)
  }
};
</script>

<style scoped>
</style>
