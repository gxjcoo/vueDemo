<template>
  <div>
    <button @click="getImgCodeApi()">1234123</button>
    <img  v-if="result" :src="result" >
  </div>
</template>
<script>
export default {
  data(){
    return{
      result:""
    }
  },
  methods:{
    async getImgCodeApi(){
      console.log(this.result)
       this.result = await this.$axios.get('/login/varifiCode', {
          responseType: "arraybuffer"
        }).then(function (response) {
        //将从后台获取的图片流进行转换
          return 'data:image/jpeg;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).then(data=>data)
      },
  }
}
</script>
<style lang="less" scoped>

</style>