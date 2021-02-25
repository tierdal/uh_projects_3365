<template>
  <div>
      <form class="swal2-form mainForm">
        <div class="editForm-left">
          <FormulateInput
            @validation="validationEmail = $event"
            type="email"
            name="email"
            label="Username (Email)"
            validation="bail|required|email"
            v-model="form.model.email"
            :validation-messages="{required: 'The username is required'}"
          />
          <FormulateInput
            @validation="validationFname = $event"
            type="text"
            name="f_name"
            label="First Name"
            validation="required"
            v-model="form.model.f_name"
            :validation-messages="{required: 'The First Name is required'}"
          />
          <FormulateInput
            @validation="validationLname = $event"
            type="text"
            name="l_name"
            label="Last Name"
            validation="required"
            v-model="form.model.l_name"
            :validation-messages="{required: 'The Last Name is required'}"
          />
          <FormulateInput
            type="text"
            @validation="validationPhone = $event"
            name="phone"
            label="Phone Number"
            validation="bail|required"
            v-model="form.model.phone"
            :validation-messages="{required: 'The Phone Number is required'}"
          />
          <FormulateInput
            type="checkbox"
            label="Approver"
            name="is_approver"
            v-model="form.model.is_approver"
          />
        </div>
        <div class="editForm-right">
          <label class="form-custom-label" for="form-department">Department</label>
            <select
              v-model="form.model.departmentId"
              id="form-department"
              name="department_id"
              class="form-custom-dropdown">
              <option
                v-for="department in DEPT_DATA"
                v-bind:value="department.department_id">
                {{ department.department_description }}
              </option>
            </select>
          <label class="form-custom-label" for="form-role">Role</label>
          <select
            v-model="form.model.roleId"
            id="form-role"
            name="role_id"
            class="form-custom-dropdown">
            <option
              v-for="option in ROLE_DATA"
              v-bind:value="option.role_id">
              {{ option.role_description }}
            </option>
          </select>
          <label class="form-custom-label" for="form-status">Status</label>
            <select
              v-model="form.model.statusId"
              id="form-status"
              name="status_id"
              class="form-custom-dropdown">
              <option
                v-for="status in STATUS_DATA"
                v-bind:value="status.status_id">
                {{ status.status_description }}
              </option>
            </select>
          <FormulateInput
            type="group"
            name="passwords"
            v-if="isNewUser"
          >
            <FormulateInput
              @validation="validationPass = $event"
              type="password"
              name="password"
              label="Password"
              validation="bail|required"
              v-model="form.model.password"
              :validation-messages="{required: 'The Password is required'}"
            />
            <FormulateInput
              @validation="validationPassConfirm = $event"
              type="password"
              name="password_confirm"
              label="Confirm Password"
              validation="bail|required|confirm"
              v-model="form.model.confirmPassword"
              :validation-messages="{required: 'The Password Confirmation is required',confirm: 'The passwords do not match'}"
            />

          </FormulateInput>
        </div>
      </form>
    <br>
    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="isNewUser" class="swal2-editform swal2-styled addNewButton" :disabled="validationCheckBoth === 0" v-on:click="addUser">Add New User</button>
        <button v-if="!isNewUser" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteUser">Delete User</button>
        <button v-if="!isNewUser" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === 0" v-on:click="updateUser">Update User</button>
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
      validationEmail: {},
      validationFname: {},
      validationLname: {},
      validationPhone: {},
      validationPass: {},
      validationPassConfirm: {},
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
  computed:{
    validationFormCheck: function () {
      if (this.validationEmail.hasErrors === false && this.validationFname.hasErrors === false && this.validationLname.hasErrors === false && this.validationPhone.hasErrors === false){
        return 1
      } else {
        return 0
      }
    },
    validationPassCheck: function () {
      if (this.validationPass.hasErrors === false && this.validationPassConfirm.hasErrors === false){
        return 1
      } else {
        return 0
      }
    },
    validationCheckBoth: function () {
      if (this.validationFormCheck === 1 && this.validationPassCheck === 1){
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    goBack(){
      this.$router.push('/useradmin')
    },
    addUser(){
      //this.$validator.validateAll().then(res => {
        //if (res) {
         this.register(this.form.model)
        //} else {
          //Swal.fire({
            //title: 'Not so fast!',
            //text: 'Please provide required data in valid format',
            //icon: 'warning',
          //})
        //}
      //})
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
          //this.DEPT_DATA.forEach( obj => this.renameKey(obj, 'department_id','departmentId'))
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
