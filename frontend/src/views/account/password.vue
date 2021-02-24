<template>
  <div>
    <form>
      <FormulateInput
        type="group"
        name="passwords"
      >
        <FormulateInput
          @validation="validationPass = $event"
          type="password"
          name="password"
          label="Password"
          autocomplete=""
          validation="bail|required"
          v-model="form.model.password"
          :validation-messages="{required: 'The Password is required'}"
        />
        <FormulateInput
          @validation="validationPassConfirm = $event"
          type="password"
          name="password_confirm"
          label="Confirm Password"
          autocomplete=""
          validation="bail|required|confirm"
          v-model="form.model.confirmPassword"
          :validation-messages="{required: 'The Password Confirmation is required',confirm: 'The passwords do not match'}"
        />

      </FormulateInput>
    <input
      :disabled="validationCheck === 0"
      class="btn btn-primary btn-block"
      type="submit"
      value="Change Password">
    </form>

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
