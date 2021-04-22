<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewlicenseKeys" class="dashlabel">
        License Key ID: {{ this.license_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New License Key
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewlicenseKeys" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateLicenseKey">Update Key</button>
        <button v-if="!isNewlicenseKeys" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteLicenseKey">Delete Key</button>
        <button v-if="isNewlicenseKeys" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addLicenseKey">Submit New Key</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationKey = $event"
          type="text"
          name="licenseKey"
          label="Licence Key"
          validation="required"
          v-model="form.model.licenseKey"
          :validation-messages="{required: 'The Key is required'}"
        />
        <label class="form-custom-label" for="form-software">Software Name</label>
        <model-list-select :list="SOFTWAREASSETS_DATA"
                           v-model="form.model.softwareId"
                           option-value="software_id"
                           id="form-software"
                           option-text="software_name"
                           :isError='validationSoftware === true'
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-user">Assigned To</label>
        <model-list-select :list="USERS_DATA"
                           v-model="form.model.userId"
                           option-value="user_id"
                           id="form-user"
                           option-text="f_name"
                           placeholder="select one">
        </model-list-select>
      </div>
    </form>
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
  props: ["license_id"],
  data() {
    return {
      isNewlicenseKeys: true,
      validationKey: {},
      DB_DATA: [],
      SOFTWAREASSETS_DATA: [],
      USERS_DATA: [],
      form: {
        model: {
          licenseKey: '',
          softwareId: '',
          userId: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationSoftware: function () {
      if (this.form.model.softwareId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationKey.hasErrors === false &&
        this.validationSoftware === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/licensekeys')
    },
    addLicenseKey(){
      if(this.form.model.userId === ''){this.form.model.userId = null}

      axios.post(`${config.api}/api/licenseKeys/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating licenseKeys)', 'error')
        })
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
          this.form.model.licenseKey = response.data.license_key
          this.form.model.softwareId = response.data.softwareId
          this.form.model.userId = response.data.userId
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding licenseKeys)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.USERS_DATA = response.data;
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
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.license_id !== undefined){
      this.isNewlicenseKeys = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
