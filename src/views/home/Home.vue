<template>
  <div id="app">
    <li v-for="(img, index) in images" :key="index">
      <p>img: {{img}}</p>
      <img :src="imgUrl(img)" alt="">
    </li>
  </div>
</template>

<script>
console.log(require.context)
const req = require.context('../../../public/img/guojia', false, /(\.png|\.gif|\.jpg)$/)
export default {
  name: 'App',
  data () {
    return {
      images: []
    }
  },
  created () {
    this.images = req.keys()
  },
  methods: {
    imgUrl (path) {
      return req(path)
    }
  }
}
</script>

<style>
img {
  height: 30px;
}
</style>