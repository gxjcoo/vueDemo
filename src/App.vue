<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
import axios from 'axios';
axios.get('/api', {
  params: {},
}).then((res) => {
  console.log(res);
});
export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style>
</style>
