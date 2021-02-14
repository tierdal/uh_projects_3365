<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Department List</h4>

      <ul>
        <li v-for="department in departments">[{{department.id}}] {{ department.description }}</li>
      </ul>
    </div>
    <div class="col-md-6">
      <router-view @refreshData="refreshList"></router-view>
    </div>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
//import { mapActions } from 'vuex'
import axios from '../../utilities/axios';
import config from '../../config';

export default {
  data() {
    return {
      departments: []
    };
  },
  methods: {
    retrieveDepartments() {
      axios.get(`${config.api}/api/departments`)
        .then((response) => {
          this.departments = response.data
        })
        .catch(() => {
          swal('Error', 'Something went wrong', 'error')
        })
    },
    refreshList() {
      this.retrieveDepartments();
    }
  },
  mounted() {
    this.retrieveDepartments();
  }
};
</script>

<style scoped>

</style>
