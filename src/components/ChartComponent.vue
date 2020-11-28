<template>
<div class="main-container">
<h1 class="main-title">Chart</h1>

<div class="box-wrap">
<div class="">
<div class="input-div">
<select name="" id="" class="custom-input">
<option v-for="item in currency_list" :key="item" value="{{ item.NumCode }}">{{ item.CharCode }}</option>
</select>
</div>

<div>
  Vue Charts does not seem to be ready for vue3 
  <br>
  https://github.com/apertureless/vue-chartjs/issues/601
<br>
https://stackoverflow.com/questions/64114215/using-vue-chartjs-in-vue-3-createelement-is-not-a-function
</div>
<!-- <line-chart
      
      :chartdata="chartdata"
      :options="chartoptions"/> -->
</div>
</div>

</div>
</template>

<script>
// var date = new Date();
//localStorage.setItem('currencyIsUserLogin','WERTYUIOP')
// if (localStorage.getItem("currencyIsUserLogin") !== null) {
//   window.location.href = window.location.origin+'/list';
// }
// const APIURL = "http://localhost/api/";
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";
// import LineChart from './Line.vue'

export default {
  name: "ChartComponent",
  // components: { LineChart },
  created() {
    this.$emit("update:layout", DefaultLayout);
    this.getCurrencyList();
  },
  data() {
    return {
      chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    chartoptions: {
      responsive: true,
      maintainAspectRatio: false
    },
      errors: [],
      currency_list: [],
    };
  },
  methods: {
    getCurrencyList() {
      const data = { page_size: 50 };
      // console.log(`${APIURL}currency/list`);

      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      const response = axios.post(
        `http://localhost/currencyTask/public/api/currency/list`,
          data
        ,
        {
          headers: {
            "Authorization" : "Bearer "+localStorage.getItem("currencyIsUserLogin"),
            "Content-Type": "application/json",
          },
        }
      );
      response
        .then((response) => {
          console.log(response.data)
          this.currency_list = response.data.data.data;
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
//     add() {
//       this.errors = [];
//       if (!this.email) {
//         this.errors.push("Email required.");
//       } else if (!ValidateEmail(this.email)) {
//         this.errors.push("Email format not correct.");
//       }
//       if (!this.password) {
//         this.errors.push("Password required.");
//       }

//       if (this.errors.length == 0) {
//         const data = {
//           email: this.email,
//           password: this.password,
//         };
//         const response = axios.post(APIURL + "login", data);
//         response
//           .then((response) => {
//             console.log(response.data);
//             // localStorage.setItem('user',JSON.stringify(response.data.user))
//             // localStorage.setItem('currencyIsUserLogin',response.data.token)
//           })
//           .catch((e) => {
//             var error = e.response.data;
//             console.log(error);
//           });
//       }
//     },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>