"use strict";
import Vue from 'vue';
import store from '../store'
import axios from "axios";
import { Message,Loading } from 'element-ui';
import _ from 'lodash';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:'/api',
  timeout:40000 //超时时长

  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const http = axios.create(config);

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
// 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
// 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
if (needLoadingRequestCount === 0 && !loading) {
  loading = Loading.service({
    lock: true,
    //text: "Loading...",
    background: 'rgba(0, 0, 0, 0.5)',
    target: target || ".cont"
  });
}
needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
needLoadingRequestCount--;
needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
if (needLoadingRequestCount === 0) {
  //关闭loading
  toHideLoading();
}
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(()=>{
    loading.close();
    loading = null;
  }, 300);

//添加请求拦截器
http.interceptors.request.use(config => {
//判断当前请求是否设置了不显示Loading
if(config.headers.showLoading !== false){
  showLoading(config.headers.loadingTarget);
}
//全局添加时间戳筛选
if(config.method=='get'){
  //判断是否有params字段
  if(config.params==undefined) config.params={}
  config.params['startTime'] = config.params.hasOwnProperty('startTime')&&(config.params['startTime']!=null)?config.params['startTime']:store.state.timeFilter.startTime
  config.params['endTime'] = config.params.hasOwnProperty('endTime')&&(config.params['startTime']!=null)?config.params['endTime']:store.state.timeFilter.endTime
}else{
  config.params['startTime'] = config.params.hasOwnProperty('startTime')&&(config.params['startTime']!=null)?config.params['startTime']:store.state.timeFilter.startTime
  config.params['endTime'] = config.params.hasOwnProperty('endTime')&&(config.params['startTime']!=null)?config.params['endTime']:store.state.timeFilter.endTime
}
return config;
}, err => {
//判断当前请求是否设置了不显示Loading
if(config.headers.showLoading !== false){
  hideLoading();
}
Message.error('请求超时!');
return Promise.resolve(err);
});

//响应拦截器
http.interceptors.response.use(
  response => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if(response.config.headers.showLoading !== false){
      hideLoading();
    }
    return response;
  },
  error => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if(error.config.headers.showLoading !== false){
      hideLoading();
    }
    if(error.response && error.response.data && error.response.data.message) {
      var jsonObj = JSON.parse(error.response.data.message);
      Message.error(jsonObj.message);
    }else{
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);








Plugin.install = function(Vue, options) {
  Vue.axios = http;
  window.axios = http;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return http;
      }
    },
    $axios: {
      get() {
        return http;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
