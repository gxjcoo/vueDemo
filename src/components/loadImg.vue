<template>
  <div class="page-container" style="text-align: center;">
    <div id="loading-panel">
      <h1><strong>Loading...</strong></h1>
      <h2><strong>{{percent}}</strong></h2>
    </div>
    <div v-for="(item,index) in img"  :key="index" >
      <img :src="item.url" alt="">
      {{img}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 1,
      total:0,
      percent: '',
      img:[]
    }
  },
  mounted: function() {
    this.preload()
  },
  methods: {
    preload: function() {
      let imgs = [

        "http://127.0.0.1:8080/img/add.png",
       
      ]
      this.total=imgs.length;
      for (let img of imgs) {
        let image = new Image()
        image.src = img
        image.onload = () => {
        
          // 计算图片加载的百分数，绑定到percent变量
          let percentNum = Math.floor(this.count / this.total * 100)
          this.percent = `${percentNum}%`
            console.log(this.percent)
             this.count++
        }
     
         
      }
    },

  },

  watch: {
    count: function(val) {
        console.log(this.count)
        console.log(this.count)
      if (val===this.total+1) {
        // 图片加载完成后跳转页面
        console.log(this.count)
        this.$router.push({path: '/'})
      }
    }
  }
}
</script>