<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewHardware" class="dashlabel">
        Hardware Asset Number: {{ this.asset_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Hardware Asset
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewHardware" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateHardware">Update Hardware</button>
        <button v-if="!isNewHardware" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteHardware">Delete Hardware</button>
        <button v-if="isNewHardware" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addHardware">Submit New Hardware</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="assetName"
          label="Name"
          validation="required"
          v-model="form.model.assetName"
          :validation-messages="{required: 'The Hardware Name is required'}"
        />
        <FormulateInput
          @validation="validationDescription = $event"
          type="text"
          name="assetDescription"
          label="Description"
          validation="required"
          v-model="form.model.assetDescription"
          :validation-messages="{required: 'The Hardware Description is required'}"
        />
        <FormulateInput
          @validation="validationSerial = $event"
          type="text"
          name="serialNumber"
          label="Serial Number"
          validation="required"
          v-model="form.model.serialNumber"
          :validation-messages="{required: 'The Serial Number is required'}"
        />
        <label class="form-custom-label" for="form-hwtype">Type</label>
        <model-list-select :list="TYPE_DATA"
                           v-model="form.model.assetTypeId"
                           id="form-hwtype"
                           option-value="assetType_id"
                           option-text="assetType_name"
                           :isError='validationType === true'
                           placeholder="select one">
        </model-list-select>
        <br />
        <label class="form-custom-label" for="form-hwstatus">Status</label>
        <model-list-select :list="STATUS_DATA"
                           v-model="form.model.assetStatusId"
                           id="form-hwstatus"
                           option-value="assetStatus_id"
                           option-text="assetStatus_name"
                           :isError='validationStatus === true'
                           placeholder="select one">
        </model-list-select>
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
        <br />
        <label class="form-custom-label" for="form-hwuser">Assigned To</label>
        <model-list-select :list="USER_DATA"
                           v-model="form.model.userId"
                           id="form-hwuser"
                           option-value="user_id"
                           option-text="email"
                           placeholder="select one">
        </model-list-select>
        <br />
        <FormulateInput
          type="date"
          name="purchaseDate"
          label="Purchase Date"
          placeholder="Purchase Date"
          v-model="form.model.purchaseDate"
        />
        <FormulateInput
          type="textarea"
          name="assetNotes"
          label="Notes"
          v-model="form.model.assetNotes"
        />
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
  name: "hardwareAssetEdit",
  props: ["asset_id"],
  data() {
    return {
      validationName: {},
      validationDescription: {},
      validationSerial: {},
      isNewHardware: true,
      DB_DATA: [],
      STATUS_DATA: [],
      TYPE_DATA: [],
      VENDOR_DATA: [],
      USER_DATA: [],
      form: {
        model: {
          assetName: '',
          assetDescription: '',
          serialNumber: '',
          assetStatusId: '',
          assetTypeId: '',
          vendorId: '',
          userId: '',
          purchaseDate: '',
          assetNotes: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationType: function () {
      if (this.form.model.assetTypeId === ''){
        return true
      } else {
        return false
      }
    },
    validationStatus: function () {
      if (this.form.model.assetStatusId === ''){
        return true
      } else {
        return false
      }
    },
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
        this.validationSerial.hasErrors === false &&
        this.validationType === false  &&
        this.validationStatus === false  &&
        this.validationVendor === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/hardwareassets')
    },
    addHardware(){
      if(this.form.model.userId === ''){this.form.model.userId = null}
      if(this.form.model.purchaseDate === ''){this.form.model.purchaseDate = null}
      if(this.form.model.assetNotes === ''){this.form.model.assetNotes = null}

      axios.post(`${config.api}/api/assetList/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating assetList)', 'error')
        })
    },
    updateHardware(){
      const assetID = this.asset_id
      axios.put(`${config.api}/api/assetList/update/` + assetID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The vendor has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating assetList)', 'error')
        })
    },
    deleteHardware(){
      const assetID = this.asset_id
      axios.delete(`${config.api}/api/assetList/delete/` + assetID)
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
      axios.get(`${config.api}/api/assetList/find/` + this.asset_id)
        .then((response) => {
          this.form.model.assetName = response.data.asset_name
          this.form.model.assetDescription = response.data.asset_description
          this.form.model.serialNumber = response.data.serial_number
          this.form.model.assetStatusId = response.data.assetStatusId
          this.form.model.assetTypeId = response.data.assetTypeId
          this.form.model.vendorId = response.data.vendorId
          this.form.model.userId = response.data.userId
          if(response.data.purchase_date) {this.form.model.purchaseDate = response.data.purchase_date.split('T')[0]}
          this.form.model.assetNotes = response.data.asset_notes
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding assetList)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/assetStatus/find`)
        .then((response) => {
          this.STATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading assetStatus)', 'error')
        })
      axios.get(`${config.api}/api/assetType/find`)
        .then((response) => {
          this.TYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading assetType)', 'error')
        })
      axios.get(`${config.api}/api/vendors/findlist`)
        .then((response) => {
          this.VENDOR_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading vendors)', 'error')
        })
      axios.get(`${config.api}/api/users/find`)
        .then((response) => {
          this.USER_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading users)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.asset_id !== undefined){
      this.isNewHardware = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

