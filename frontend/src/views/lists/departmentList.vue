<template>
  <div>
      <h4>Department List</h4>
      <!--<ul>
        <li v-for="department in departments">[{{department.id}}] {{ department.description }}</li>
      </ul>

      :fields="fields"
      :data-path="data.data"
      :per-page="itemsPerPage"
      :http-fetch="myFetch"
      :multi-sort="true"
      pagination-path=""
              :data-path="'data'"  ?sort=&page=1&per_page=3

      -->

    <!--<vuetable ref="vuetable"
              :api-url="myAPI"
              :fields="fields"
              :per-page="itemsPerPage"
              :http-fetch="myFetch"
              :multi-sort="true"
              pagination-path=""
    />
    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>

    <datatable
      title="Departments"
      :columns="fields"
      :rows="data"
      :paginate="true"
      :perPage="[3, 5, 10, 25, 50, 100]"
    >
      <th slot="thead-tr">
        Actions
      </th>
      <template slot="tbody-tr" scope="props">
        <td>
          <button class="btn red darken-2 waves-effect waves-light compact-btn"
                  @click="e => deleteItem(props.row, e)">
            <i class="material-icons white-text">edit</i>
          </button>
          <button class="btn red darken-2 waves-effect waves-light compact-btn"
                  @click="e => deleteItem(props.row, e)">
            <i class="material-icons white-text">delete</i>
          </button>
        </td>
      </template>

    </datatable>-->
<br>
    <!--<div class="table-pagination">
      <ve-pagination
        :total="totalCount"
        :page-index="pageIndex"
        :page-size="pageSize"
        :pageSizeOption="[3,10,25,100]"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <ve-table
      :columns="fields2"
      :table-data="tableData"
      :sort-option="sortOption"
    />
    <div class="table-pagination">
      <ve-pagination
        :total="totalCount"
        :page-index="pageIndex"
        :page-size="pageSize"
        :pageSizeOption="[3,10,25,100]"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
        />
    </div>-->

    <div>
      <vue-good-table
        :columns="fields3"
        :rows="DB_DATA"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'id', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 3,
          position: 'top',
          perPageDropdown: [3, 5, 10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
      />
    </div>
  </div>




</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
//import { mapActions } from 'vuex'
//import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
//import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
//import _ from "lodash";
import axios from '../../utilities/axios';
import config from '../../config';
//import DataTable from "vue-materialize-datatable";
//import { VueEasytable  } from "vue-easytable";
//import { VeTable } from "vue-easytable";
//import { VePagination } from "vue-easytable";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/departments`,
      //dataLength: '',
      //pageSize: 3,
      //pageIndex: 1,
      /*fields: [{
        label: "ID",
        field: 'id',
        numeric: true,
        html: false
      }, {
        label: "Description",
        field: 'description',
        numeric: false,
        html: false
      }],*/
      /*fields2: [
        { field: "id",
          key: "id",
          title: "id",
          align: "center",
          sortBy: "asc"
        },
        { field: "description",
          key: "description",
          title: "description",
          align: "left",
          sortBy: "asc"
        }
      ],*/
      /*sortOption: {
        // sort always
        sortAlways: true,
        sortChange: (params) => {
          console.log("sortChange::", params);
          this.sortChange(params);
        },
      },*/
      fields3: [{
        label: 'id',
        field: 'id',
        type: 'number'
      },{
        label: 'description',
        field: 'description'
      }]
    };
  },
  /*computed: {
    // table data
    tableData() {
      const { pageIndex, pageSize } = this;
      return this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    // total count
    totalCount() {
      return this.DB_DATA.length;
    },
  },*/
  components: {
    //Vuetable,
    //VuetablePagination
    //"datatable": DataTable,
    //"ve-table": VeTable,
    //"ve-pagination": VePagination,
    'vue-good-table': VueGoodTable
  },
  methods: {
    /*myFetch(myAPI, httpOptions) {
      return axios.get(myAPI, httpOptions)
        /*.then((response) => {
          this.data = response.data;
          console.log('Status: ' + response.status + ' ' + response.statusText)
          console.log('Headers:')
          console.log(response.headers)
          console.log('Config:')
          console.log(response.config)
          console.log('Data:')
          console.log(response.data)
          console.log(JSON.stringify(response.data))
        })
        .catch(() => {
          swal('Error', 'Something went wrong', 'error')
        })
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    //onActionClicked(action, data) {
    //  console.log("slot actions: on-click", data.id);
    //}
    sortChange(params) {
      this.tableData.sort((a, b) => {
        if (params.id) {
          if (params.id === "asc") {
            return a.id - b.id;
          } else if (params.id === "desc") {
            return b.id - a.id;
          } else {
            return 0;
          }
        } else if (params.description) {
          if (params.description === "asc") {
            return a.description - b.description;
          } else if (params.description === "desc") {
            return b.description - a.description;
          } else {
            return 0;
          }
        }
      });
    },
    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
    },

    // page size change
    pageSizeChange(itemsPerPage) {
      this.pageIndex = 1;
      this.pageSize = itemsPerPage;
    },*/
    deleteItem(){},
  },
  beforeMount() {
    axios.get(`${config.api}/api/departments`)
      .then((response) => {
        this.DB_DATA = response.data;
        /*this.dataLength = response.data.length;
        console.log('Status: ' + response.status + ' ' + response.statusText)
        console.log('Headers:')
        console.log(response.headers)
        console.log('Config:')
        console.log(response.config)
        console.log('Data:')
        console.log(response.data)
        console.log(JSON.stringify(response.data))
        console.log(JSON.stringify(response.data.length))*/
      })
      .catch(() => {
        swal('Error', 'Something went wrong', 'error')
      })
    //this.$refs.vuetable.refresh()

  }
};
</script>

<style scoped>
button.ui.button {
  padding: 8px 3px 8px 10px;
  margin-top: 1px;
  margin-bottom: 1px;
}
.table-pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right;
}
</style>
