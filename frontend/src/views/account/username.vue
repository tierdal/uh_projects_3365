<template>
  <form @submit.prevent="submit">
      <FormulateInput
        @validation="validationEmail = $event"
        type="email"
        name="username"
        label="Username (Email)"
        validation="bail|required|email"
        v-model="form.model.username"
        :validation-messages="{required: 'The username is required'}"
      />
      <!--

    <div class="form-group">
      <label>Username</label>
    <input
        v-model="form.model.username"
        class="form-control"
        type="text"
        autocomplete="username"
        placeholder="Username"
        name="username">
    </div>-->

    <input
      :disabled="validationCheck === 0"
      class="btn btn-primary btn-block"
      type="submit"
      value="Change Username">
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      validationEmail:{},
      form: {
        model: {
          username: '',
        },
      },
    }
  },
  created() {
    this.form.model.username = this.user.username
  },
  computed:{
    validationCheck: function () {
      if (this.validationEmail.hasErrors === false){
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
