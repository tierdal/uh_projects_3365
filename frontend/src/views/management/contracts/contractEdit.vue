<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewContract" class="dashlabel">
        Contract Number: {{ this.contract_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Contract
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewContract" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateContract">Update Contract</button>
        <button v-if="!isNewContract" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteContract">Delete Contract</button>
        <button v-if="isNewContract" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addContract">Submit New Contract</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="contractName"
          label="Contract Name"
          validation="required"
          v-model="form.model.contractName"
          :validation-messages="{required: 'The Contract Name is required'}"
        />
        <FormulateInput
          @validation="validationDescription = $event"
          type="textarea"
          name="contractDescription"
          label="Contract Description"
          validation="required"
          v-model="form.model.contractDescription"
          :validation-messages="{required: 'The Contract Description is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-vendor">Vendor</label>
        <model-list-select :list="VENDOR_DATA"
                           v-model="form.model.vendorId"
                           id="form-vendor"
                           option-value="vendor_id"
                           option-text="vendor_name"
                           :isError='validationVendor === true'
                           placeholder="select one">
        </model-list-select>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select';

export default {
  name: "contractEdit",
  props: ["contract_id"],
  data() {
    return {
      validationName: {},
      validationDescription: {},
      isNewContract: true,
      DB_DATA: [],
      VENDOR_DATA: [],
      form: {
        model: {
          contractName: '',
          contractDescription: '',
          vendorId: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationVendor: function () {
      if (this.form.model.vendorId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationDescription.hasErrors === false &&
        this.validationVendor === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/contracts')
    },
    addContract(){
      axios.post(`${config.api}/api/contracts/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating contract)', 'error')
        })
    },
    updateContract(){
      const contractID = this.contract_id
      axios.put(`${config.api}/api/contracts/update/` + contractID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The contract has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating contract)', 'error')
        })
    },
    deleteContract(){
      const contractID = this.contract_id
      axios.delete(`${config.api}/api/contracts/delete/` + contractID)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/contracts/find/` + this.contract_id)
        .then((response) => {
          this.form.model.contractName = response.data.contract_name
          this.form.model.contractDescription = response.data.contract_description
          this.form.model.vendorId = response.data.vendorId
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding contract)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/vendors/findlist`)
        .then((response) => {
          this.VENDOR_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.contract_id !== undefined){
      this.isNewContract = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
