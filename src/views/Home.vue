<template>
  <div class="box">
        <div id="charts" style=" width:100%;height:100%;"></div>
  </div>
</template>



<style lang="less" scoped>
.box{
  width:18rem;
  height:10rem;
  background: #000;
}
</style>

<script>
import {linearGradient } from "../utils/charts/chartsLine"
export default {
  methods: {
  linearGradient
  },
  mounted() {
    this.$nextTick(function() {
      this.linearGradient(this,"charts");
    });
  }
};
</script>