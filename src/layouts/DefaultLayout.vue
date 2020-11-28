<template>
  <div class="Home">
    <header class="main-header">
      <div class="main-logo">Logo</div>
      <nav class="main-navbar">
        <router-link v-show="!isLogin" to="/">Home</router-link>
        <!-- | -->
        <!-- <router-link to="/contact">Contact</router-link> -->
        <router-link v-show="isLogin" to="/list">Currency</router-link>
        <router-link v-show="isLogin" to="/advance-requirement">Advance Requirement</router-link>
        <router-link v-show="isLogin" to="/chart">Chart</router-link>
        <router-link v-show="isLogin" to="/logout">Logout</router-link>
      </nav>
    </header>

    <slot></slot>
  </div>
</template>

<style >
</style>

<script>
// import DefaultLayout from '../layouts/DefaultLayout.vue';

export default {
  name: "DefaultLayout",
  created() {
    this.isUserLogin();
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    isUserLogin() {
      if (
        localStorage.getItem("currencyIsUserLogin") === null ||
        localStorage.getItem("currencyIsUserLogin") === ""
      ) {
        this.isLogin = false
      } else {
        this.isLogin = true
      }
    },
  },
};
</script>