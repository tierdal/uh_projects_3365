<template>
  <div>
    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          type="text"
          name="title"
          label="Title"
          validation="required"
          v-model="form.model.key"
          :validation-messages="{required: 'The key is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-software">software</label>
        <model-list-select :list="SOFTWAREASSETS_DATA"
                           v-model="form.model.softwareId"
                           option-value="software_id"
                           id="form-software"
                           option-text="software_name"
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-user">user</label>
        <model-list-select :list="USERS_DATA"
                           v-model="form.model.userId"
                           option-value="user_id"
                           id="form-user"
                           option-text="f_name"
                           placeholder="select one">
        </model-list-select>
      </div>
    </form>
    <br>
    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
        <button class="swal2-editform swal2-styled addNewButton" v-on:click="addLicenseKey">Add New LicenseKey</button>
        <button class="swal2-editform swal2-styled deleteButton" v-on:click="deleteLicenseKey">Delete LicenseKey</button>
        <button class="swal2-editform swal2-styled updateButton" v-on:click="updateLicenseKey">Update LicenseKey</button>
      </div>
    </div>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../utilities/axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select'

export default {
  props: ["licenseKeys_id"],
  data() {
    return {
      isNewlicenseKeys: true,
      //validationKey: {},
      DB_DATA: [],
      SOFTWAREASSETS_DATA: [],
      USERS_DATA: [],
      form: {
        model: {
          softwareId: '',
          key: '',
          userId: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  methods: {
    goBack(){
      this.$router.push('/manage/licensekeys')
    },
    addLicenseKey(){
      this.register(this.form.model)
    },
    updateLicenseKey(){
      const licenseKeysID = this.license_id
      axios.put(`${config.api}/api/licenseKeys/update/` + licenseKeysID, this.form.model)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The FAQ has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating licenseKeys)', 'error')
        })
    },
    deleteLicenseKey(){
      const licenseKeysID = this.license_id
      axios.delete(`${config.api}/api/licenseKeys/delete/` + licenseKeysID)
        .then((response) => {
          //this.loadData()
          Swal.fire(
            'Done!',
            'The faq list has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (deleting faq licenseKeys)', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/licenseKeys/find/` + this.license_id)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.key = response.data.license_key
          //this.form.model.faq_categoryId = response.data.faq_categoryId
          //console.log(JSON.stringify(this.DB_DATA))
          //console.log('Dept: ' + this.departmentId + ', Role: ' + this.roleId + ', Status: ' + this.statusId)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding licenseKeys)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.USERS_DATA = response.data;
          //this.DEPT_DATA.forEach( obj => this.renameKey(obj, 'department_id','departmentId'))
          //console.log(JSON.stringify(this.DEPT_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading users)', 'error')
        })
      axios.get(`${config.api}/api/softwareAssets/find`)
        .then((response) => {
          this.SOFTWAREASSETS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading software)', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.licenseKeys_id !== undefined){
      this.isNewlicenseKeys = false
      this.loadData()
    }
    //console.log(this.isNewUser)
  },
  mounted() {
    //console.log(this.email)
  }
};
</script>

<style scoped>
</style>
