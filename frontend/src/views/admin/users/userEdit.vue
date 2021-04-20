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
          <model-list-select :list="DEPT_DATA"
                             v-model="form.model.departmentId"
                             option-value="department_id"
                             id="form-department"
                             option-text="department_description"
                             placeholder="select one">
          </model-list-select>
          <label class="form-custom-label" for="form-role">Role</label>
          <model-list-select :list="ROLE_DATA"
                             v-model="form.model.roleId"
                             id="form-role"
                             option-value="role_id"
                             option-text="role_description"
                             placeholder="select one">
          </model-list-select>
          <label class="form-custom-label" for="form-status">Status</label>
          <model-list-select :list="STATUS_DATA"
                             v-model="form.model.statusId"
                             id="form-status"
                             option-value="status_id"
                             option-text="status_description"
                             placeholder="select item">
          </model-list-select>
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
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select'

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
    ModelSelect,
    ModelListSelect
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
      this.register(this.form.model)
    },
    updateUser(){
      const userID = this.user_id
      if (this.user_id === 1) {
        Swal.fire(
          'Stop!',
          'You cannot update the Admin user.',
          'error'
        )
      } else {
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
            Swal.fire('Error', 'Something went wrong (updating user)', 'error')
          })
      }
    },
    deleteUser(){
      const userID = this.user_id
      if (this.user_id === 1) {
        Swal.fire(
          'Stop!',
          'You cannot update the Admin user.',
          'error'
        )
      } else {
        axios.delete(`${config.api}/api/users/delete/` + userID)
          .then((response) => {
            //this.loadData()
            Swal.fire(
              'Done!',
              'The user has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting user)', 'error')
          })
      }
    },
    loadData(){
      axios.get(`${config.api}/api/users/find/` + this.user_id)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.email = response.data.email,
          this.form.model.f_name = response.data.f_name,
          this.form.model.l_name = response.data.l_name,
          this.form.model.phone = response.data.phone,
          this.form.model.departmentId = response.data.department.department_id,
          this.form.model.roleId = response.data.role.role_id,
          this.form.model.statusId = response.data.status.status_id,
          this.form.model.is_approver = response.data.is_approver
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding user)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/departments/find`)
        .then((response) => {
          this.DEPT_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading departments)', 'error')
        })
      axios.get(`${config.api}/api/roles/find`)
        .then((response) => {
          this.ROLE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading roles)', 'error')
        })
      axios.get(`${config.api}/api/status/find`)
        .then((response) => {
          this.STATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading status)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.user_id !== undefined){
      this.isNewUser = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
