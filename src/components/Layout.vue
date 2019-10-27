<template>
  <div>
    <div class="menu">
     <Menu></Menu>
    </div>
    <router-view class="content"></router-view>
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
.content{
    width:100%;
    height:100vh;
}
</style>