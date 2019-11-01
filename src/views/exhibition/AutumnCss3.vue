<template>
  <div class="bg">
    <div class="box">
      <figure>
        <figcaption>Autumn in HangZhou</figcaption>
      </figure>
    </div>
    
    <div class="box2">
            <!-- 一个div中放全部图片 -->
      <div class="content" :style="a==img.length?'opacity:1':'opacity:0'">
        <div class="item" :style="itemStyle()" v-for="item in img"  :key="item">
          <img :src="`/img/${item}.jpeg`" />
        </div>
      </div>
      <!-- 每个div放一个图片 -->
      <div class="content" :style="index == a?'opacity:1':'opacity:0'" v-for="(item,index) in img "  :key="item">
        <img :src="`/img/${item}.jpeg`" width="100%" />
      </div>

    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: ["autumn1", "lang_dark", "autumn3"],
      a:'',
    };
  },
  methods: {
    itemStyle() {
      return { width: 100 / this.img.length + "%" };
    },
    contentStyle(){

    }
  },
  mounted(){
    this.a =this.img.length
    let i = 0;
    setInterval(()=>{
      i++
      this.a = i%(this.img.length+1)
      console.log(this.a)
    },2000)
  }
};
</script>
<style lang="less">
.box2 {
  background: #fff;
  height: 8rem;
  width: 12rem;
  margin: 4rem auto;
  // overflow: hidden;
  position: relative;
  .content {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
  transition: all 1s ;
    .item {
      width: 100%;
      height: 100%;
      float: left;
      img {
        height: 100%;
      }
    }
  }
}
@keyframes opa {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(hsl(80, 51%, 8%), #e0d7a3);
}
.box {
  perspective: 1000px;
  width: 33%;
  margin: 0 auto;
}
figure {
  margin: 0;
  width: 100%;
  height: 18vw;
  background: url("../../assets/img/autumn2.jpeg");
  background-size: 100%;
  transform-origin: center bottom;
  transform-style: preserve-3d;
  transition: 1s all ;
}
figure figcaption {
  width: 100%;
  margin-top: 8rem;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../../assets/img/autumn2.jpeg");
  background-size: 100%;
  height: 50px;
  background-repeat: no-repeat;
  background-position: bottom;
  color: #fff;
  position: relative;
  top: 18vw;
  transform-origin: center top;
  transform: rotateX(-89.9deg);
  font-size: 1.2vw;
  font-family: Montserrat, Arial, sans-serif;
  text-align: center;
  line-height: 3;
}
figure:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.1),
    inset 0 0 250px 250px rgba(0, 0, 0, 0.1);
  transition: 1s;
  transform: rotateX(95deg) translateZ(-80px) scale(0.75);
  transform-origin: inherit;
}
.box:hover figure {
  transform: rotateX(75deg) translateZ(5vw);
}
.box:hover figure:before {
  box-shadow: 0 0 25px 25px rgba(0, 0, 0, 0.5),
    inset 0 0 250px 250px rgba(0, 0, 0, 0.5);
  transform: rotateX(-5deg) translateZ(-80px) scale(1);
}

@media screen and (max-width: 800px) {
  div {
    width: 50%;
  }
  figure {
    height: 45vw;
  }
  figure figcaption {
    top: 45vw;
    font-size: 2vw;
  }
}

@media screen and (max-width: 500px) {
  div {
    width: 80%;
    margin-top: 1rem;
  }
  figure {
    height: 70vw;
  }
  figure figcaption {
    top: 70vw;
    font-size: 3vw;
  }
}
</style>