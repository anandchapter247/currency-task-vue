<template>
  <component :is="layout">
    <router-view v-model:layout.sync="layout"/>
  </component>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      layout: 'div',
    };
  }
}
</script>

