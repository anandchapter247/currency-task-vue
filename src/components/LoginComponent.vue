<template>
  <div class="main-container">
    <h1 class="main-title">Login</h1>

    <div class="box-wrap">
      <div class="">
        <div class="input-div">
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            v-model="email"
            class="custom-input"
          />
          <input
            type="password"
            name=""
            id="password"
            placeholder="Password"
            v-model="password"
            class="custom-input"
          />
          <button @click="login()" class="theme-btn">Login</button>
          <span class="error-text" v-show="itemExistMsg !== ''">{{
            itemExistMsg
          }}</span>
        </div>
        <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
      </div>
    </div>
    <div v-show="loginErrorMsg !== ''" class="error-div">
      {{ loginErrorMsg }}
    </div>
  </div>
</template>

<script>
// var date = new Date();
  //localStorage.setItem('currencyIsUserLogin','WERTYUIOP')
if (localStorage.getItem("currencyIsUserLogin") != undefined && localStorage.getItem("currencyIsUserLogin") !== null && localStorage.getItem("currencyIsUserLogin") !== '') {
  // window.location.href = window.location.origin+'/list';
}
import config from '../config'
const APIURL = config.API_URL ;
console.log(APIURL);
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";
import { validationMixin } from "vuelidate";

export default {
  name: "LoginComponent",
  mixins: [validationMixin],
  created() {
    this.$emit("update:layout", DefaultLayout);
  },
  data() {
    return {
      password: "",
      email: "",
      errors: [],
      loginErrorMsg: "",
    };
  },
  methods: {
    login() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!ValidateEmail(this.email)) {
        this.errors.push("Email format not correct.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }

      if (this.errors.length == 0) {
        const data = {
          email: this.email,
          password: this.password,
        };
        console.log( config.API_URL );
        const response = axios.post (APIURL+`login`, data);
        response
          .then((response) => {
            console.log(response.data);
            // localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('currencyIsUserLogin',response.data.access_token)
            window.location = window.location.origin+"/list";
          })
          .catch((e) => {
            var error = e.response.data;
            console.log(error);
            this.loginErrorMsg = "Email or password incorrect!";
          });
      }
    },
  },
};

function ValidateEmail(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>