<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Username</label>
      <input
        v-model="form.model.username"
        class="form-control"
        type="text"
        autocomplete="username"
        placeholder="Username"
        name="username">
    </div>

    <input
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
