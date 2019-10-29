
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="app in swiperSlides" :key="app">
      <component :is="app"></component>
    </swiper-slide>

    <!-- 标记点 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
 
<script>
import pie from "../echarts/pie.vue";
import echarts from "../echarts/echarts.vue";
// require styles
import 'swiper/dist/css/swiper.css'
 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          
          autoplay:{
            delay: 5000
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: ["pie","echarts"],
      }
    },
    components: {
    pie,
    echarts,
     swiper,
    swiperSlide
  },
    mounted() {
      setInterval(() => {
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>