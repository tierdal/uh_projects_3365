<template>
  <div>
    <div class="jumbotron dashboard">
      <div class="dashlabel">
        User Report
      </div>
    </div>

    <badger-accordion>
      <badger-accordion-item>
        <template slot="header">Query Parameters</template>
        <template slot="content">
          <br>
          <form class="swal2-form mainForm">
            <div class="editForm-left">
              <label class="form-custom-label" for="form-department">User Department</label>
              <model-list-select :list="DEPT_DATA"
                                 v-model="form.model.departmentId"
                                 id="form-department"
                                 option-value="department_id"
                                 option-text="department_description"
                                 placeholder="select one">
              </model-list-select>
              <br />
              <label class="form-custom-label" for="form-role">User Role</label>
              <model-list-select :list="ROLE_DATA"
                                 v-model="form.model.roleId"
                                 id="form-role"
                                 option-value="role_id"
                                 option-text="role_description"
                                 placeholder="select one">
              </model-list-select>
            </div>
            <div class="editForm-right">
              <label class="form-custom-label" for="form-status">User Status</label>
              <model-list-select :list="STATUS_DATA"
                                 v-model="form.model.statusId"
                                 id="form-status"
                                 option-value="status_id"
                                 option-text="status_description"
                                 placeholder="select one">
              </model-list-select>
              <br />
              <label class="form-custom-label" for="form-isapprover">Is Approver</label>
              <model-list-select :list="IS_APPROVER_DATA"
                                 v-model="form.model.is_approver"
                                 id="form-isapprover"
                                 option-value="isApproverValue"
                                 option-text="isApproverName"
                                 placeholder="select one">
              </model-list-select>
            </div>
          </form>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button class="swal2-editform swal2-styled" v-on:click="submitQuery">Submit Query</button>
        <button class="swal2-editform swal2-styled" v-on:click="clearForm">Clear Form</button>
      </div>
    </div>

    <br />

    <div class="reportBody">
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'user_id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [3, 5, 10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>

  </div>
</template>

<script>
import axios from "../../../utilities/axios";
import config from "../../../config";
import Swal from "sweetalert2";
import _ from "lodash";
import {ModelListSelect, ModelSelect} from "vue-search-select";
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: "ticketsReport",
  components: {
    ModelSelect,
    ModelListSelect,
    BadgerAccordion,
    BadgerAccordionItem,
    VueGoodTable
  },
  data() {
    return {
      DB_DATA: [],
      DEPT_DATA: [],
      ROLE_DATA: [],
      STATUS_DATA: [],
      IS_APPROVER_DATA: [
        {isApproverId: 0, isApproverValue: false, isApproverName: 'Not Approver'},
        {isApproverId: 1, isApproverValue: true, isApproverName: 'Approver'}
      ],
      form: {
        model: {
          departmentId: '',
          roleId: '',
          is_approver: '',
          statusId: ''
          //createdAt: '',
          //updatedAt: '',
          //closedAt: ''

        },
      },
      dataFields: [{
        label: 'ID',
        field: 'user_id',
        type: 'number'
      },{
        label: 'Username',
        field: 'email'
      },{
        label: 'First Name',
        field: 'f_name'
      },{
        label: 'Last Name',
        field: 'l_name'
      },{
        label: 'Phone',
        field: 'phone'
      },{
        label: 'Department',
        field: 'department.department_description'
      },{
        label: 'Role',
        field: 'role.role_description'
      },{
        label: 'Approver',
        field: 'is_approver'
      },{
        label: 'Status',
        field: 'status.status_description'
      }]
    };
  },
  methods:{
    goBack(){
      this.$router.push('/reports')
    },
    clearForm(){
      this.form.model.departmentId = ''
      this.form.model.roleId = ''
      this.form.model.is_approver = ''
      this.form.model.statusId = ''
      this.DB_DATA = []
    },
    submitQuery(){
      if(this.form.model.departmentId === ''){this.form.model.departmentId = null}
      if(this.form.model.roleId === ''){this.form.model.roleId = null}
      if(this.form.model.is_approver === ''){this.form.model.is_approver = null}
      if(this.form.model.statusId === ''){this.form.model.statusId = null}
      axios.get(`${config.api}/api/users/findreport`, { params: this.form.model })
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding users)', 'error')
        })
    },
    onRowDoubleClick(params){
      this.$router.push({
        name: '/useradmin/edit',
        params: {
          user_id: params.row.user_id
        }
      })
    },
    loadFields(){
      axios.get(`${config.api}/api/departments/find`)
        .then((response) => {
          this.DEPT_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading departments)', 'error')
        })
      axios.get(`${config.api}/api/roles/find`)
        .then((response) => {
          this.ROLE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading roles)', 'error')
        })
      axios.get(`${config.api}/api/status/find`)
        .then((response) => {
          this.STATUS_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading statuses)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
  }
}
</script>

<style scoped>

</style>
