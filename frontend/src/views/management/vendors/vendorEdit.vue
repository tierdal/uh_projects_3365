<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewVendor" class="dashlabel">
        Vendor Number: {{ this.vendor_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Vendor
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewVendor" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateVendor">Update Vendor</button>
        <button v-if="!isNewVendor" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteVendor">Delete Vendor</button>
        <button v-if="isNewVendor" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addVendor">Submit New Vendor</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="vendorName"
          label="Vendor Name"
          validation="required"
          v-model="form.model.vendorName"
          :validation-messages="{required: 'The Vendor Name is required'}"
        />
        <FormulateInput
          @validation="validationEmail = $event"
          type="text"
          name="vendorEmail"
          label="Vendor Email"
          validation="bail|required|email"
          v-model="form.model.vendorEmail"
          :validation-messages="{required: 'The Vendor Email is required'}"
        />
        <FormulateInput
          @validation="validationPhone = $event"
          type="text"
          name="vendorPhone"
          label="Vendor Phone"
          validation="required"
          v-model="form.model.vendorPhone"
          :validation-messages="{required: 'The Vendor Phone is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-location">Vendor Location</label>
        <model-list-select :list="LOCATION_DATA"
                           v-model="form.model.locationId"
                           id="form-location"
                           option-value="location_id"
                           option-text="location_name"
                           :isError='validationLocation === true'
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-paymentTerms">Payment Terms</label>
        <model-list-select :list="PAYTERM_DATA"
                           v-model="form.model.paymentTermId"
                           id="form-paymentTerms"
                           option-value="paymentTerm_id"
                           option-text="paymentTerm_name"
                           placeholder="select one">
        </model-list-select>
        <br />
        <FormulateInput
          type="textarea"
          name="vendorNotes"
          label="Vendor Notes"
          v-model="form.model.vendorNotes"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import session from "../../../utilities/session";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select';
import lumberjack from '../../../utilities/lumberjack'

export default {
  name: "vendorEdit",
  props: ["vendor_id"],
  data() {
    return {
      validationName: {},
      validationEmail: {},
      validationPhone: {},
      isNewVendor: true,
      DB_DATA: [],
      LOCATION_DATA: [],
      PAYTERM_DATA: [],
      form: {
        model: {
          vendorName: '',
          vendorEmail: '',
          vendorPhone: '',
          locationId: '',
          paymentTermId: '',
          vendorNotes: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationLocation: function () {
      if (this.form.model.locationId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationEmail.hasErrors === false &&
        this.validationPhone.hasErrors === false &&
        this.validationLocation === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/vendors')
    },
    addVendor(){
      if(this.form.model.paymentTermId === ''){this.form.model.paymentTermId = null}
      if(this.form.model.vendorNotes === ''){this.form.model.vendorNotes = null}

      axios.post(`${config.api}/api/vendors/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating vendor)', 'error')
        })
    },
    updateVendor(){
      const vendorID = this.vendor_id
      axios.put(`${config.api}/api/vendors/update/` + vendorID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The vendor has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating vendor)', 'error')
        })
    },
    deleteVendor(){
      const vendorID = this.vendor_id
      axios.delete(`${config.api}/api/vendors/delete/` + vendorID)
        .then((response) => {
          this.loadData()
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
      axios.get(`${config.api}/api/vendors/find/` + this.vendor_id)
        .then((response) => {
          this.form.model.vendorName = response.data.vendor_name
          this.form.model.vendorEmail = response.data.vendor_email
          this.form.model.vendorPhone = response.data.vendor_phone
          this.form.model.locationId = response.data.locationId
          this.form.model.paymentTermId = response.data.paymentTermId
          this.form.model.vendorNotes = response.data.vendor_notes
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding vendor)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/locations/findlist`)
        .then((response) => {
          this.LOCATION_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
      axios.get(`${config.api}/api/paymentTerms/find`)
        .then((response) => {
          this.PAYTERM_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading paymentTerms)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.vendor_id !== undefined){
      this.isNewVendor = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

