<template>
  <div class="main-container">
    <h1 class="main-title">Currency List</h1>

    <div class="box-wrap">
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Currency</th>
            <th>Code</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currency_list" :key="item">
            <td>{{ from + index }}</td>
            <td>{{ item.CharCode }}</td>
            <td>{{ item.NumCode }}</td>
            <td>{{ item.Name }}</td>
            <td>
              <a v-bind:href="`/history/${item.NumCode}`" class="btn"
                >History</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <a v-for="l in links" :key="l" @click="showList(l.label)" v-html="`${l.label}`"></a>
      </div>
    </div>
    <div v-show="noItemSelectedForMoveMsg !== ''" class="error-div">
      {{ noItemSelectedForMoveMsg }}
    </div>
  </div>
</template>

<script>
console.log(process.env.API_URL);
if (
  localStorage.getItem("currencyIsUserLogin") === null ||
  localStorage.getItem("currencyIsUserLogin") === ""
) {
  // window.location.href = window.location.origin;
}
import config from "../config";
const APIURL = config.API_URL;
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";

export default {
  name: "ListComponent",
  created() {
    this.getCurrencyList(), this.$emit("update:layout", DefaultLayout);
  },
  data() {
    return {
      currency_list: [],
      item_name: "",
      right_items: [],
      links: [],
      page : 0,
      from : 1
    };
  },
  methods: {
    getCurrencyList() {
      
      // const data = { token: localStorage.getItem("currencyIsUserLogin") };
      const data = { page_size: 5, page : this.page };
      console.log(`${APIURL}currency/list`);

      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      const response = axios.post(
        `http://localhost/currencyTask/public/api/currency/list`,
        data,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("currencyIsUserLogin"),
            "Content-Type": "application/json",
          },
        }
      );
      response
        .then((response) => {
          console.log(response.data.data);
          this.currency_list = response.data.data.data;
          this.links = response.data.data.links;
          this.from = response.data.data.from;
          // this.currency_list.forEach((e) => {
          //   this.item_list.push(e.name);
          //   this.left_items.push(e.name);
          // });
        })
        .catch((e) => {
          var error = e.response.data;
          console.log(error);
        });
    },

    showList(pageno){
      if( pageno == 'Next &raquo;'){
        console.log('next')
        this.page = this.page + 1;
      }else if( pageno == '&laquo; Previous'){
        console.log('previous')
        this.page = this.page - 1;
      }else{
        this.page = pageno
      }
      this.getCurrencyList()
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>