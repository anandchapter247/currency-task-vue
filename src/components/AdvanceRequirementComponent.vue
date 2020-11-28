<template>
  <div class="main-container">
    <h1 class="main-title">Advance Requirement</h1>

    <div class="box-wrap">
      <div class="input-div">
        <div class="width100">
          <select
            name=""
            id=""
            class="custom-input"
            v-model="cid"
            @change="getCurrencyRates()"
          >
            <option value="" selected>Select currency</option>
            <option
              v-for="item in currency_list"
              :key="item"
              v-bind:value="item.NumCode"
            >
              {{ item.CharCode }}
            </option>
          </select>
          <div v-show="selectCurrency !== ''" class="error-div">
            {{ selectCurrency }}
          </div>
        </div>
        <input
          type="text"
          name=""
          id=""
          class="custom-input"
          placeholder="Date(yyyy-mm-dd)"
          v-model="from_date"
        />

        <button @click="getCurrencyRates()" class="theme-btn width225px">
          Get Rates
        </button>
      </div>

      <hr />
      <table>
        <thead>
          <tr>
            <th>Min</th>
            <th>Max</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ rate_list.min }}</td>
            <td>{{ rate_list.max }}</td>
            <td>{{ rate_list.avg }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <a
          v-for="l in links"
          :key="l"
          @click="showList(l.label)"
          v-html="`${l.label}`"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
if (localStorage.getItem("item_management_token") === null) {
  // localStorage.setItem("item_management_token", uniqueToken.join(""));
}
const APIURL = "http://localhost/currency_api/";
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";

export default {
  name: "AdvanceRequirementComponent",
  created() {
    this.getCurrencyList(), this.$emit("update:layout", DefaultLayout);
  },
  data() {
    return {
      currency_list: [],
      rate_list: [],
      currency: {},
      links: [],
      from: 0,
      page: 0,
      from_date: "",
      cid: "",
      post_data: {},
      selectCurrency: "",
    };
  },
  methods: {
    getCurrencyList() {
      const data = { page_size: 50 };
      // console.log(`${APIURL}currency/list`);

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
          console.log(response.data);
          this.currency_list = response.data.data.data;
        })
        .catch((e) => {
          var error = e.response.data;
          console.log(error);
        });
    },
    getCurrencyRates() {
      if (this.cid == "") {
        this.selectCurrency = "Please select currency";
        return;
      }
      this.selectCurrency = "";

      if (this.from_date != "") {
        this.post_data = { base_currency_id: this.cid, date: this.from_date };
      } else {
        this.post_data = { base_currency_id: this.cid };
      }
      console.log(this.cid);
      console.log(`${APIURL}currency/list`);

      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      const response = axios.post(
        `http://localhost/currencyTask/public/api/currency/calculation`,
        this.post_data,
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
          console.log(response.data.data.min);
          // console.log(response.data.data.history);
          // this.currency = response.data.data.currency;
          this.rate_list.min = response.data.data.min;
          this.rate_list.max = response.data.data.max;
          this.rate_list.avg = response.data.data.avg;
          console.log(this.rate_list);
          // this.links = response.data.data.history.links;
          // this.from = response.data.data.history.from;
        })
        .catch((e) => {
          var error = e.response.data;
          console.log(error);
        });
    },
    showList(pageno) {
      if (pageno == "Next &raquo;") {
        console.log("next");
        this.page = this.page + 1;
      } else if (pageno == "&laquo; Previous") {
        console.log("previous");
        this.page = this.page - 1;
      } else {
        this.page = pageno;
      }
      this.getCurrencyList();
    },
  },
};

// function pad(n, width, z) {
//   z = z || "0";
//   n = n + "";
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>