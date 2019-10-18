<template>
  <div class="box">
    
        <div id="charts" style=" width:100%;height:100%;"></div>
  </div>
</template>



<style lang="less" scoped>
.box{
  width:100%;
  height:100vh;
  // background: #000;
}
</style>

<script>
import {echartsWorld } from "@/utils/charts/chartsWorld"
export default {
  
  data(){
    return {
      a:1000,
      
    }
  },
  methods: {
    add(){
      this.a++
    },
  echartsWorld
  },
  mounted() {
    let self = this
    setInterval(function(){
      self.a = 1019
    },500)

    this.$nextTick(function() {
      this.echartsWorld(this,"charts");
    });
        //根据窗口的大小变动图表 --- 重点
window.addEventListener("resize",function(){
  self.echartsWorld(self,"charts");
});
  }
};
</script>