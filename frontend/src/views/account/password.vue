<template>
  <div>
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
    </div>

    <input
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
      form: {
        model: {
          password: '',
          confirmPassword: '',
        },
      },
    }
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
