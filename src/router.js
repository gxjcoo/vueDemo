import Vue from 'vue'
import Router from 'vue-router'
import Layout from './components/Layout.vue'
import LoadImg from './components/loadImg.vue'
import Home from './views/home/Home.vue'
import echarts from './router/echarts'
import store from './store';
Vue.use(Router)

const router = new Router({
   mode: 'history',
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


//路由守卫
router.beforeEach((to,from,next)=>{
  console.log(store.state.timeFilter)
   store.commit('timeFilter/initData')
  next()
})
export default router