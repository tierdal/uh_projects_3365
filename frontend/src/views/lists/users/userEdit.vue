<template>
  <div>
    <form class="swal2-form">
    <!--Username <input id="form-email" class="swal2-input" placeholder="Username" value="' + params.row.email + '"><br />
    First Name <input id="form-fname" class="swal2-input" placeholder="First Name" value="' + params.row.f_name + '"><br />
    Last Name <input id="form-lname" class="swal2-input" placeholder="Last Name" value="' + params.row.l_name + '"><br />
    Phone <input id="form-phone" class="swal2-input" placeholder="Phone" value="' + params.row.phone + '"><br />
    Department <input id="form-department" class="swal2-input" placeholder="Department" value="' + params.row.departmentDesc + '"><br />
    Role <input id="form-role" class="swal2-input" placeholder="Role" value="' + params.row.roleDesc + '"><br />
    Approver <input type="checkbox" id="form-approver" class="swal2-checkbox" v-model="checked" placeholder="Approver" value="' + params.row.is_approver + '"><br />
    Status <input id="form-status" class="swal2-input" placeholder="Status" value="' + params.row.statusDesc + '">-->
    </form>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../utilities/axios';
import config from '../../../config';
import Swal from 'sweetalert2'

export default {
  props: ["user_id"],
  data() {
    return {
      DB_DATA: [],
      DEPT_DATA: [],
      ROLE_DATA: [],
      STATUS_DATA: []
    };
  },
  components: {
  },
  methods: {
    populateFormData(){},
    addNewUser(){},
    loadData(){
      axios.get(`${config.api}/api/users/find/` + this.user_id)
        .then((response) => {
          this.DB_DATA = response.data;
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'status.status_id','statusId'))
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'status.status_description','statusDesc'))
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'role.role_id','roleId'))
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'role.role_description','roleDesc'))
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'department.department_id','departmentId'))
          //this.DB_DATA.forEach( obj => this.renameKey(obj, 'department.department_description','departmentDesc'))
          //this.dataLength = response.data.length;
          //console.log('Status: ' + response.status + ' ' + response.statusText)
          //console.log('Headers:')
          //console.log(response.headers)
          //console.log('Config:')
          //console.log(response.config)
          //console.log('Data:')
          //console.log(response.data)
          //console.log(JSON.stringify(response.data.length))
          console.log(JSON.stringify(this.DB_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
      axios.get(`${config.api}/api/departments/find`)
        .then((response) => {
          this.DEPT_DATA = response.data;
          //console.log(JSON.stringify(this.DEPT_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
      axios.get(`${config.api}/api/roles/find`)
        .then((response) => {
          this.STATUS_DATA = response.data;
          //console.log(JSON.stringify(this.STATUS_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
      axios.get(`${config.api}/api/status/find`)
        .then((response) => {
          this.ROLE_DATA = response.data;
          //console.log(JSON.stringify(this.ROLE_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){},
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    this.loadData();
  },
  mounted() {
    //console.log(this.email)
  }
};
</script>

<style scoped>
</style>
