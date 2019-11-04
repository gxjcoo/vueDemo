<template>
  <div>
    <div class="menu">
     <Menu></Menu>
    </div>
    <div class="cont">
    <router-view></router-view>

    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue"
  export default {
    components:{
        Menu
    }
  }
</script>

<style lang="less" scoped>
.menu{
  position: absolute;
  top:0rem;
  color:#fff;
  z-index: 999;
  height:100vh;
}
.cont{
    width:100%;
    height:100vh;
    overflow: auto;
}
</style>