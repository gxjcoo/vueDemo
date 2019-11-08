<template>
  <Acc></Acc>
</template>
<script>
import Acc from "../exhibition/AutumnCss3.vue"
export default {
data() {
  return {
  }
},
  components:{Acc},
  methods:{
    async  init(){
 let  a = this.$axios.get('http://10.121.200.201:8080/stap/trafficAnalysis/internal?direction=1&startTime=1573142400000&endTime=1573193972946#/login').then(
   setTimeout(()=>{},10000)
 )
    }
  },
  created(){
this.init()
   
  }
};
</script>
<style lang="less">

</style>