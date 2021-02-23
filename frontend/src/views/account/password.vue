<template>
  <div>
      <FormulateInput
        type="group"
        name="passwords"
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

      <!--

    <div class="form-group">
      <label>Password</label>
      <input
        v-model="form.model.password"
        class="form-control"
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
    </div>-->

    <input
      :disabled="validationCheck === 0"
      class="btn btn-primary btn-block"
      type="submit"
      value="Change Password">

    <br>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      validationPass: {},
      validationPassConfirm: {},
      form: {
        model: {
          password: '',
          confirmPassword: '',
        },
      },
    }
  },
  computed:{
    validationCheck: function () {
      if (this.validationPass.hasErrors === false && this.validationPassConfirm.hasErrors === false){
        return 1
      } else {
        return 0
      }
    },
  },
  methods: {
    ...mapActions(['updateLogin']),
    onSubmit() {
      this.updateLogin()
    },
  },
}
</script>

<style lang='stylus'>
</style>
