<template>
  <div>
    <h2>Account Details</h2>
    <form class="swal2-form">
      <FormulateInput
        type="email"
        name="email"
        label="Username (Email)"
        disabled="true"
        v-model="form.model.email"
      />
      <FormulateInput
        type="text"
        name="f_name"
        label="First Name"
        disabled="true"
        v-model="form.model.f_name"
      />
      <FormulateInput
        type="text"
        name="l_name"
        label="Last Name"
        disabled="true"
        v-model="form.model.l_name"
      />
      <FormulateInput
        type="text"
        name="phone"
        label="Phone Number"
        disabled="true"
        v-model="form.model.phone"
      />
      <FormulateInput
        type="checkbox"
        label="Approver"
        name="is_approver"
        disabled="true"
        v-model="form.model.is_approver"
      />
      <FormulateInput
        type="text"
        name="department"
        label="Department"
        disabled="true"
        v-model="form.model.departmentDescription"
      />
      <FormulateInput
        type="text"
        name="role"
        label="Role"
        disabled="true"
        v-model="form.model.roleDescription"
      />
      <FormulateInput
        type="text"
        name="status"
        label="Status"
        disabled="true"
        v-model="form.model.statusDescription"
      />
    </form>
  </div>
</template>

<script>
import axios from "../../utilities/axios";
import config from "../../config";
import Swal from "sweetalert2";
import session from "../../utilities/session";

export default {
  data() {
    return {
      //DB_DATA: [],
      form: {
        model: {
          email: '',
          f_name: '',
          l_name: '',
          phone: '',
          departmentDescription: '',
          roleDescription: '',
          is_approver: '',
          statusDescription: '',
        },
      },
    }
  },
  methods: {
    loadData(){
      const user_id = session.getUser().user_id
      axios.get(`${config.api}/api/users/find/` + user_id)
        .then((response) => {
          //this.DB_DATA = response.data;
          this.form.model.email = response.data.email,
          this.form.model.f_name = response.data.f_name,
          this.form.model.l_name = response.data.l_name,
          this.form.model.phone = response.data.phone,
          this.form.model.departmentDescription = response.data.department.department_description,
          this.form.model.roleDescription = response.data.role.role_description,
          this.form.model.statusDescription = response.data.status.status_description,
          this.form.model.is_approver = response.data.is_approver
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    }
  },
  beforeMount() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
