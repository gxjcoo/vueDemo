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
import {pieSpace } from "@/utils/charts/chartPie.js"
export default {
  
  data(){
    return {
    }
  },
  methods: {
  pieSpace,
  cahrtInit(){
    let rem = document.documentElement.clientWidth/80;
this.pieSpace(this,"charts",rem);
  }
  },
  mounted() {
    let self = this
    this.$nextTick(function() {
      this.cahrtInit()
    });
window.addEventListener("resize",function(){
  self.cahrtInit()
});
  }
};
</script>