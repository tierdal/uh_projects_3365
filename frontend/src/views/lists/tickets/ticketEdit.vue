<template>
  <div>
    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationEmail = $event"
          type="text"
          name="ticketName"
          label="Ticket Title"
          validation="required"
          v-model="form.model.ticketName"
          :validation-messages="{required: 'The Ticket Name is required'}"
        />
        <FormulateInput
          @validation="validationFname = $event"
          type="textarea"
          name="ticketDescription"
          label="Ticket Description"
          validation="required"
          v-model="form.model.ticketDescription"
          :validation-messages="{required: 'The Ticket Description is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-location">Issue Location</label>
        <model-list-select :list="LOCATION_DATA"
                           v-model="form.model.locationId"
                           id="form-location"
                           option-value="location_id"
                           option-text="location_name"
                           placeholder="select one">
        </model-list-select>
      </div>
    </form>
    <br>
    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="isNewTicket" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === 0" v-on:click="addTicket">Add New Ticket</button>
        <button v-if="!isNewTicket" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteTicket">Delete Ticket</button>
        <button v-if="!isNewTicket" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === 0" v-on:click="updateTicket">Update Ticket</button>
      </div>
    </div>
    <br>
    <div class="editForm">
      load task list here
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select'

export default {
  name: "ticketEdit",
  props: ["ticket_id"],
  data() {
    return {
      validationEmail: {},
      validationFname: {},
      validationLname: {},
      validationPhone: {},
      validationPass: {},
      validationPassConfirm: {},
      isNewTicket: 'true',
      DB_DATA: [],
      LOCATION_DATA: [],
      ASSET_DATA: [],
      SOFTWARE_DATA: [],
      REQSTATUS_DATA: [],
      ISSUETYPE_DATA: [],
      PRILIST_DATA: [],
      ISSUECAT_DATA: [],
      form: {
        model: {
          ticketName: '',
          ticketDescription: '',
          locationId: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationFormCheck: function () {
      if (this.validationEmail.hasErrors === false && this.validationFname.hasErrors === false && this.validationLname.hasErrors === false && this.validationPhone.hasErrors === false){
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    goBack(){
      this.$router.push('/tickets')
    },
    addTicket(){
    },
    updateTicket(){
      const ticketID = this.ticket_id
      axios.put(`${config.api}/api/tickets/update/` + ticketID, this.form.model)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The ticket has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating ticket)', 'error')
        })
    },
    deleteTicket(){
      const ticketID = this.ticket_id
      axios.delete(`${config.api}/api/tickets/delete/` + ticketID)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The ticket has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (deleting ticket)', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/tickets/find/` + this.ticket_id)
        .then((response) => {
          this.DB_DATA = response.data;
          console.log(JSON.stringify(this.DB_DATA))

          this.form.model.ticketName = response.data.ticket_id,
          this.form.model.ticketDescription = response.data.ticket_description,
          this.form.model.locationId = response.data.location_id
          /*this.form.model.email = response.data.email,
          this.form.model.f_name = response.data.f_name,
          this.form.model.l_name = response.data.l_name,
          this.form.model.phone = response.data.phone,
          this.form.model.departmentId = response.data.department.department_id,
          this.form.model.roleId = response.data.role.role_id,
          this.form.model.statusId = response.data.status.status_id,
          this.form.model.is_approver = response.data.is_approver*/

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding ticket)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/locations/find`)
        .then((response) => {
          this.LOCATION_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading locations)', 'error')
        })
      axios.get(`${config.api}/api/assets/find`)
        .then((response) => {
          this.ASSET_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading assets)', 'error')
        })
      axios.get(`${config.api}/api/software/find`)
        .then((response) => {
          this.SOFTWARE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading software)', 'error')
        })
      axios.get(`${config.api}/api/requestStatus/find`)
        .then((response) => {
          this.REQSTATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading requestStatus)', 'error')
        })
      axios.get(`${config.api}/api/issueType/find`)
        .then((response) => {
          this.ISSUETYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading issueType)', 'error')
        })
      axios.get(`${config.api}/api/priorityList/find`)
        .then((response) => {
          this.PRILIST_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading priorityList)', 'error')
        })
      axios.get(`${config.api}/api/issueCategory/find`)
        .then((response) => {
          this.ISSUECAT_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading issueCategory)', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    //this.loadFields()
    if (this.ticket_id !== undefined){
      this.isNewTicket = false
      this.loadData()
    }
  }
};
</script>

<style scoped>

</style>
