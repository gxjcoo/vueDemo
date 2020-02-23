import Vue from 'vue'
import Vuex from 'vuex'
import timeFilter from './store/timeFilter.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    timeFilter
  }
})