<template>
  <div class="login-wrapper">
    <div class="row">
      <div class="col-lg-6 offset-lg-3">
        <div class="card text-black bg-light">
          <div class="card-body">
            <form @submit.prevent="submit">
              <h2>Sign In</h2>
              <p>Please provide required information to continue.</p>

                <FormulateInput
                  @validation="validationEmail = $event"
                  type="email"
                  name="username"
                  label="Username (Email)"
                  autocomplete="email"
                  validation="bail|required|email"
                  v-model="form.model.username"
                  :validation-messages="{required: 'The username is required'}"
                />
                <FormulateInput
                  @validation="validationPass = $event"
                  type="password"
                  name="password"
                  label="Password"
                  autocomplete="current-password"
                  validation="bail|required"
                  v-model="form.model.password"
                  :validation-messages="{required: 'The Password is required'}"
                />
              <input
                :disabled="validationCheck === 0"
                class="btn btn-primary btn-block"
                type="submit"
                value="Sign In">

              <br>
            </form>
          </div>
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
      validationEmail:{},
      validationPass:{},
      form: {
        model: {
          password: '',
          username: '',
        },
      },
    }
  },
  computed:{
    validationCheck: function () {
      if (this.validationPass.hasErrors === false && this.validationEmail.hasErrors === false){
        return 1
      } else {
        return 0
      }
    },
  },
  methods: {
    ...mapActions(['login']),

    submit() {
      //this.$validator.validateAll().then(res => {
        //if (res) {
          this.login(this.form.model)
        //} else {
        //  Swal.fire({
        //    title: 'Not so fast!',
        //    text: 'Please provide required data in valid format',
        //    icon: 'warning',
        //})
        //}
      //})
    },
  },
}
</script>

<style lang='stylus'>
</style>
