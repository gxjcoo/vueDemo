<template>
  <div class="box">
    <div v-for="item in imgs" :style="{width:(100/imgs.length)+'%'}" :key="item">
      <img :src="`img/sfqcss/${item}.png`" alt />
    </div>
  </div>
</template>
<script>
export default {
    props:["imgs"],

  methods: {},
  mounted() {}
};
</script>
<style lang="less">
.box {
  width: 10rem;
  height: 6rem;
  margin: 2rem auto;
  overflow: hidden;
}
.box div {
  height: 100%;
  float: left;
  transition: all 1s;
}
img {
  height:100%;
  cursor: pointer;
}
.box:hover div {
  width: 5% !important;
}
.box div:hover {
  width: 55% !important;
}
</style>