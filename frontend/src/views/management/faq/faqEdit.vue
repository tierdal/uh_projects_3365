<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewFAQ" class="dashlabel">
        FAQ Number: {{ this.faq_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New FAQ
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewFAQ" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateFaq">Update FAQ</button>
        <button v-if="!isNewFAQ" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteFaq">Delete FAQ</button>
        <button v-if="isNewFAQ" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addFaq">Submit New FAQ</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationTitle = $event"
          type="text"
          name="title"
          label="Title"
          validation="required"
          v-model="form.model.faqTitle"
          :validation-messages="{required: 'The title is required'}"
        />
        <FormulateInput
          @validation="validationBody = $event"
          type="textarea"
          name="body"
          label="Descriptions"
          validation="required"
          v-model="form.model.faqBody"
          :validation-messages="{required: 'The body is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-faq_category">FAQ Category</label>
        <model-list-select :list="FAQ_CATEGORY_DATA"
                           v-model="form.model.faqCategoryId"
                           option-value="faq_category_id"
                           id="form-faq_category"
                           option-text="faq_category_description"
                           :isError='validationCategory === true'
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
  props: ["faq_id"],
  data() {
    return {
      isNewFAQ: true,
      validationTitle: {},
      validationBody: {},
      DB_DATA: [],
      FAQ_CATEGORY_DATA: [],
      form: {
        model: {
          faqTitle: '',
          faqBody: '',
          faqCategoryId: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationCategory: function () {
      if (this.form.model.faqCategoryId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationTitle.hasErrors === false &&
        this.validationBody.hasErrors === false &&
        this.validationCategory === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/manage/faq')
    },
    addFaq(){
      axios.post(`${config.api}/api/faqList/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating faqList)', 'error')
        })
    },
    updateFaq(){
      const faqID = this.faq_id
        axios.put(`${config.api}/api/faqList/update/` + faqID, this.form.model)
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
            Swal.fire('Error', 'Something went wrong (updating FAQ)', 'error')
          })
    },
    deleteFaq(){
      const faqID = this.faq_id
        axios.delete(`${config.api}/api/faqList/delete/` + faqID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The faq list has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting faq list)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/faqList/find/` + this.faq_id)
        .then((response) => {
          this.DB_DATA = response.data;
            this.form.model.faqTitle = response.data.faq_title,
            this.form.model.faqBody = response.data.faq_body,
            this.form.model.faqCategoryId = response.data.faq_categoryId
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding faq list)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/faqCategory/find`)
        .then((response) => {
          this.FAQ_CATEGORY_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading faq category)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.faq_id !== undefined){
      this.isNewFAQ = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
