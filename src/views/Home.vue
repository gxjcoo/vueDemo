<template>
  <div class="box">
        <div id="charts" style=" width:100%;height:100%;"></div>
  </div>
</template>



<style lang="less" scoped>
.box{
  width:100%;
  height:100vh;
  background: #000;
}
</style>

<script>
import {echartsWorld } from "../utils/charts/chartsWorld"
export default {
  methods: {
  echartsWorld
  },
  mounted() {
    this.$nextTick(function() {
      this.echartsWorld(this,"charts");
    });
  }
};
</script>