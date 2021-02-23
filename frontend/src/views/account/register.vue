<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">
      <div class="card text-black bg-light">
        <div class="card-body">
          <form @submit.prevent="submit">
            <h2>Register</h2>
            <p>Please provide required information to create an account.</p>

            <div class="form-group">
              <label>Email</label>
              <input
                v-model="form.model.email"
                class="form-control"
                type="text"
                autocomplete="email"
                placeholder="email"
                name="email">
            </div>


            <div class="form-group">
              <label>First Name</label>
              <input
                v-model="form.model.f_name"
                class="form-control"
                type="text"
                placeholder="First Name"
                name="f_name">
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <input
                v-model="form.model.l_name"
                class="form-control"
                type="text"
                placeholder="Last Name"
                name="l_name">
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <input
                v-model="form.model.phone"
                class="form-control"
                type="phone"
                placeholder="Phone Number"
                name="phone">
            </div>

            <div class="form-group">
              <label>Department ID</label>
              <input
                v-model="form.model.department_id"
                class="form-control"
                type="number"
                placeholder="Department ID"
                name="department_id">
            </div>

            <div class="form-group">
              <label>Role ID</label>
              <input
                v-model="form.model.role_id"
                class="form-control"
                type="number"
                placeholder="Role ID"
                name="role_id">
            </div>

            <div class="form-group">
              <label>Is Approver</label>
              <input
                v-model="form.model.is_approver"
                class="form-control"
                type="number"
                placeholder="Is Approver"
                name="is_approver">
            </div>

            <div class="form-group">
              <label>Status</label>
              <input
                v-model="form.model.status_id"
                class="form-control"
                type="number"
                placeholder="Status"
                name="status_id">
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                v-model="form.model.password"
                class="form-control"
                ref="password"
                type="password"
                autocomplete="new-password"
                placeholder="Password"
                name="password">
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                v-model="form.model.confirmPassword"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Confirm Password"
                name="confirmPassword">
            </div>

            <input
              class="btn btn-primary btn-block"
              type="submit"
              value="Register">

            <br>

            <router-link
              class="btn-link"
              to="/auth/login">
              Already have an account?
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
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
    }
  },
  methods: {
    ...mapActions(['register']),

    submit() {
      //this.$validator.validateAll().then(res => {
        //if (res) {
          this.register(this.form.model)
        //} else {
         // Swal.fire({
            //title: 'Not so fast!',
            //text: 'Please provide required data in valid format',
            //icon: 'warning',
          //})
        //}
      //})
    },
  },
}
</script>

<style lang='stylus'>
</style>
