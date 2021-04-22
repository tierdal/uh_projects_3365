<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewSoftware" class="dashlabel">
        Software Number: {{ this.software_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Software
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewSoftware" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateSoftwareAsset">Update Software</button>
        <button v-if="!isNewSoftware" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteSoftwareAsset">Delete Software</button>
        <button v-if="isNewSoftware" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addSoftwareAsset">Submit New Software</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="softwareName"
          label="Software Name"
          validation="required"
          v-model="form.model.softwareName"
          :validation-messages="{required: 'The Software Name is required'}"
        />
        <FormulateInput
          @validation="validationDescription = $event"
          type="textarea"
          name="softwareDescription"
          label="Software Description"
          validation="required"
          v-model="form.model.softwareDescription"
          :validation-messages="{required: 'The Software Description is required'}"
        />
        <label class="form-custom-label" for="form-softwareStatus">Software Status</label>
        <model-list-select :list="SWSTATUS_DATA"
                           v-model="form.model.softwareStatusId"
                           id="form-softwareStatus"
                           option-value="softwareStatus_id"
                           option-text="softwareStatus_description"
                           :isError='validationStatus === true'
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-vendor">Software Vendor</label>
        <model-list-select :list="VENDOR_DATA"
                           v-model="form.model.vendorId"
                           id="form-vendor"
                           option-value="vendor_id"
                           option-text="vendor_name"
                           :isError='validationVendor === true'
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
          name="softwareNotes"
          label="Software Notes"
          v-model="form.model.softwareNotes"
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
  name: "softwareAssetEdit",
  props: ["software_id"],
  data() {
    return {
      validationName: {},
      validationDescription: {},
      isNewSoftware: true,
      DB_DATA: [],
      SWSTATUS_DATA: [],
      VENDOR_DATA: [],
      form: {
        model: {
          softwareName: '',
          softwareDescription: '',
          softwareStatusId: '',
          vendorId: '',
          purchaseDate: '',
          softwareNotes: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationStatus: function () {
      if (this.form.model.softwareStatusId === ''){
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
        this.validationStatus === false &&
        this.validationVendor === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/softwareassets')
    },
    addSoftwareAsset(){
      if(this.form.model.purchaseDate === ''){this.form.model.purchaseDate = null}
      if(this.form.model.softwareNotes === ''){this.form.model.softwareNotes = null}

      axios.post(`${config.api}/api/softwareAssets/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating softwareAsset)', 'error')
        })
    },
    updateSoftwareAsset(){
      const softwareID = this.software_id
      axios.put(`${config.api}/api/softwareAssets/update/` + softwareID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The softwareAsset has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating softwareAsset)', 'error')
        })
    },
    deleteSoftwareAsset(){
      const softwareID = this.software_id
      axios.delete(`${config.api}/api/softwareAssets/delete/` + softwareID)
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
      axios.get(`${config.api}/api/softwareAssets/find/` + this.software_id)
        .then((response) => {
          this.form.model.softwareName = response.data.software_name
          this.form.model.softwareDescription = response.data.software_description
          this.form.model.softwareStatusId = response.data.softwareStatusId
          this.form.model.vendorId = response.data.vendorId
          if(response.data.purchase_date) {this.form.model.purchaseDate = response.data.purchase_date.split('T')[0]}
          this.form.model.softwareNotes = response.data.software_notes
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding softwareAsset)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/softwareStatus/find`)
        .then((response) => {
          this.SWSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading softwareStatus)', 'error')
        })
      axios.get(`${config.api}/api/vendors/findlist`)
        .then((response) => {
          this.VENDOR_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading vendors)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.software_id !== undefined){
      this.isNewSoftware = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

