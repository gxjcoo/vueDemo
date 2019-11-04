<template>
  <Sfq :imgs="i"></Sfq>
</template>
<script>
import Sfq from "../component/shoufengqin.vue"
export default {
data() {
  return {
    i:[1,2,6,9,7,8,3,4]
  }
},
  components:{Sfq}
};
</script>
<style lang="less">

</style>