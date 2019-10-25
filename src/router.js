import Vue from 'vue'
import Router from 'vue-router'
import Layout from './components/Layout.vue'
import LoadImg from './components/loadImg.vue'
import Home from './views/home/Home.vue'
import echarts from './router/echarts'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/loading',
      name: 'loadImg',
      component: LoadImg
    },
    {
      path: '/',
      component: Layout,
      children: [
        //主页
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        // echart
       ...echarts,
    ]
    },
    {
      path: '*',
      redirect: {
          name: 'Home'
      }
  }
  ]
})
