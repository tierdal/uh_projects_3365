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
                v-validate="'required|min:3|max:36'"
                v-model="form.model.email"
                class="form-control"
                type="text"
                autocomplete="email"
                placeholder="email"
                name="email">
              <span
                v-show="errors.has('email')"
                class="invalid-feedback"
                v-html="errors.first('email')" />
            </div>

            <div class="form-group">
              <label>Name</label>
              <input
                v-model="form.model.name"
                class="form-control"
                type="text"
                placeholder="Name"
                name="name">
              <span
                v-show="errors.has('name')"
                class="invalid-feedback"
                v-html="errors.first('name')" />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                v-validate="'required|min:6|max:16'"
                v-model="form.model.password"
                class="form-control"
                ref="password"
                type="password"
                autocomplete="new-password"
                placeholder="Password"
                name="password">
              <span
                v-show="errors.has('password')"
                class="invalid-feedback"
                v-html="errors.first('password')" />
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                v-validate="'required|confirmed:password'"
                v-model="form.model.confirmPassword"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Confirm Password"
                name="confirmPassword">
              <span
                v-show="errors.has('confirmPassword')"
                class="invalid-feedback"
                v-html="errors.first('confirmPassword')" />
            </div>

            <input
              :disabled="errors.any()"
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

export default {
  data() {
    return {
      form: {
        model: {
          password: '',
          confirmPassword: '',
          username: '',
          name: '',
        },
      },
    }
  },
  methods: {
    ...mapActions(['register']),

    submit() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.register(this.form.model)
        } else {
          swal(
            'Not so fast!',
            'Please provide required data in valid format',
            'warning',
          )
        }
      })
    },
  },
}
</script>

<style lang='stylus'>
</style>
