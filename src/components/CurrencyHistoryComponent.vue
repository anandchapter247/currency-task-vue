<template>
  <div class="main-container">
    <h1 class="main-title">Currency History</h1>

    <div class="box-wrap">
      
      <div class="width100">
        <div class="show-detail width100">Name : {{ currency.Name }}</div>
        <div class="show-detail width25">Id : {{ currency.ID }}</div>
        <div class="show-detail width25">NumCode : {{ currency.NumCode }}</div>
        <div class="show-detail width25">
          CharCode : {{ currency.CharCode }}
        </div>
        <div class="show-detail width25">Nominal : {{ currency.Nominal }}</div>
        <div class="show-detail width25">&nbsp;</div>
      </div>
      <hr />

      <div class="input-div">
      <input
        type="text"
        name=""
        id=""
        class="custom-input"
        placeholder="From Date(yyyy-mm-dd)"
        v-model="from_date"
      />
      <input
        type="text"
        name=""
        id=""
        class="custom-input"
        placeholder="To Date(yyyy-mm-dd)"
        v-model="to_date"
      />
      <button @click="getCurrencyList()" class="theme-btn width225px">Get History</button>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currency_list" :key="item">
            <td>{{ index + from }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.currency_date }}</td>
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
    <div v-show="noItemSelectedForMoveMsg !== ''" class="error-div">
      {{ noItemSelectedForMoveMsg }}
    </div>
  </div>
</template>

<script>
if (localStorage.getItem("item_management_token") === null) {
  // localStorage.setItem("item_management_token", uniqueToken.join(""));
}
import config from '../config'
const APIURL = config.API_URL ;
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";

export default {
  name: "CurrencyHistoryComponent",
  created() {
    this.getCurrencyList(), this.$emit("update:layout", DefaultLayout);
  },
  data() {
    return {
      id: this.$route.params.id,
      currency_list: [],
      currency: {},
      links: [],
      from: 0,
      page: 0,
      from_date: "",
      to_date: "",
      post_data : {},
      page_size : 2
    };
  },
  methods: {
    getCurrencyList() {
      var digitCount = this.id.toString().length;
      var cid = 0;
      if (digitCount == 2) {
        cid = pad(this.id, 3);
      } else {
        cid = this.id;
      }
      
      if (this.from_date != "" || this.to_date != '') {
        this.post_data = { page_size: this.page_size, currency_id: cid, page: this.page, date_from : this.from_date, date_to : this.to_date };
      } else {
        this.post_data = { page_size: this.page_size, currency_id: cid, page: this.page };
      }

      // console.log(`${APIURL}currency/list`);

      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      const response = axios.post(
        APIURL+`currency/history`,
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
          // console.log(response.data.data.currency);
          // console.log(response.data.data.history);
          this.currency = response.data.data.currency;
          this.currency_list = response.data.data.history.data;
          this.links = response.data.data.history.links;
          this.from = response.data.data.history.from;
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

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>