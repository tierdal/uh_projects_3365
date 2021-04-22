<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewLocation" class="dashlabel">
        Location Number: {{ this.location_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Location
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewLocation" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateLocation">Update Location</button>
        <button v-if="!isNewLocation" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteLocation">Delete Location</button>
        <button v-if="isNewLocation" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addLocation">Submit New Location</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="locationName"
          label="Location Name"
          validation="required"
          v-model="form.model.locationName"
          :validation-messages="{required: 'The Location Name is required'}"
        />
        <label class="form-custom-label" for="form-locationType">Location Type</label>
        <model-list-select :list="TYPE_DATA"
                           v-model="form.model.locationTypeId"
                           id="form-locationType"
                           option-value="locationType_id"
                           option-text="locationType_description"
                           :isError='validationType === true'
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <FormulateInput
          @validation="validationStreet = $event"
          type="text"
          name="locationStreet"
          label="Street"
          validation="required"
          v-model="form.model.locationStreet"
          :validation-messages="{required: 'The Street is required'}"
        />
        <FormulateInput
          type="text"
          name="locationStreet2"
          label="Street 2"
          v-model="form.model.locationStreet2"
        />
        <FormulateInput
          @validation="validationCity = $event"
          type="text"
          name="locationCity"
          label="City"
          validation="required"
          v-model="form.model.locationCity"
          :validation-messages="{required: 'The City is required'}"
        />
        <FormulateInput
          @validation="validationState = $event"
          type="text"
          name="locationState"
          label="State"
          validation="required"
          v-model="form.model.locationState"
          :validation-messages="{required: 'The State is required'}"
        />
        <FormulateInput
          @validation="validationZip = $event"
          type="text"
          name="locationZip"
          label="ZIP"
          validation="required"
          v-model="form.model.locationZip"
          :validation-messages="{required: 'The ZIP is required'}"
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
  name: "locationEdit",
  props: ["location_id"],
  data() {
    return {
      validationName: {},
      validationStreet: {},
      validationCity: {},
      validationState: {},
      validationZip: {},
      isNewLocation: true,
      DB_DATA: [],
      TYPE_DATA: [],
      STATE_DATA: [],
      ZIP_DATA: [],
      form: {
        model: {
          locationName: '',
          locationTypeId: '',
          locationStreet: '',
          locationStreet2: '',
          locationCity: '',
          locationState: '',
          locationZip: '',
          locationCountry: 'USA',
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
      if (this.form.model.locationTypeId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationStreet.hasErrors === false &&
        this.validationCity.hasErrors === false &&
        this.validationState.hasErrors === false &&
        this.validationZip.hasErrors === false &&
        this.validationType === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/locations')
    },
    addLocation(){
      if(this.form.model.locationStreet2 === ''){this.form.model.locationStreet2 = null}

      axios.post(`${config.api}/api/locations/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating location)', 'error')
        })
    },
    updateLocation(){
      const locationID = this.location_id
      axios.put(`${config.api}/api/locations/update/` + locationID, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The location has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating location)', 'error')
        })
    },
    deleteLocation(){
      const locationID = this.location_id
      axios.delete(`${config.api}/api/locations/delete/` + locationID)
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
      axios.get(`${config.api}/api/locations/find/` + this.location_id)
        .then((response) => {
          this.form.model.locationName = response.data.location_name
          this.form.model.locationTypeId = response.data.locationTypeId
          this.form.model.locationStreet = response.data.location_street
          this.form.model.locationStreet2 = response.data.location_street2
          this.form.model.locationCity = response.data.location_city
          this.form.model.locationState = response.data.location_state
          this.form.model.locationZip = response.data.location_zip
          this.form.model.locationCountry = response.data.location_country
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding location)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/locationType/find`)
        .then((response) => {
          this.TYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locationType)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.location_id !== undefined){
      this.isNewLocation = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

