<template>
  <div>
    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          type="text"
          name="title"
          label="Title"
          validation="required"
          v-model="form.model.title"
          :validation-messages="{required: 'The title is required'}"
        />
        <FormulateInput
          type="textarea"
          name="body"
          label="Descriptions"
          validation="required"
          v-model="form.model.body"
          :validation-messages="{required: 'The body is required'}"
        />
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-faq_category">faq_category</label>
        <model-list-select :list="FAQ_CATEGORY_DATA"
                           v-model="form.model.faq_categoryId"
                           option-value="faq_category_id"
                           id="form-faq_category"
                           option-text="faq_category_description"
                           placeholder="select one">
        </model-list-select>
      </div>
    </form>
    <br>
    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
        <button class="swal2-editform swal2-styled addNewButton" v-on:click="addFaq">Add New FAQ</button>
        <button class="swal2-editform swal2-styled deleteButton" v-on:click="deleteFaq">Delete FAQ</button>
        <button class="swal2-editform swal2-styled updateButton" v-on:click="updateFaq">Update FAQ</button>
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
          title: '',
          body: '',
          faq_categoryId: '',
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
      this.$router.push('/manage/faq')
    },
    addFaq(){
      this.register(this.form.model)
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
            //this.loadData()
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
          //this.dataLength = response.data.length;
          //console.log('Status: ' + response.status + ' ' + response.statusText)
          //console.log('Headers:')
          //console.log(response.headers)
          //console.log('Config:')
          //console.log(response.config)
          //console.log('Data:')
          //console.log(response.data)
          //console.log(JSON.stringify(response.data.length))
            this.form.model.title = response.data.faq_title,
            this.form.model.body = response.data.faq_body,
            this.form.model.faq_categoryId = response.data.faq_categoryId
          //console.log(JSON.stringify(this.DB_DATA))
          //console.log('Dept: ' + this.departmentId + ', Role: ' + this.roleId + ', Status: ' + this.statusId)
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding faq list)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/faqCategory/find`)
        .then((response) => {
          this.FAQ_CATEGORY_DATA = response.data;
          //this.DEPT_DATA.forEach( obj => this.renameKey(obj, 'department_id','departmentId'))
          //console.log(JSON.stringify(this.DEPT_DATA))
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading faq category)', 'error')
        })
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.faq_id !== undefined){
      this.isNewFAQ = false
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
