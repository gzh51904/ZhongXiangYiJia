import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'
import store from './vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import Vuelazyload from 'vue-lazyload';

import "./rem/rem.js";

Vue.prototype.$axios = axios;

export const $axios = axios.create({
  timeout: 7000,
});

Vue.use(Vuelazyload, {
  preLoad: 1,/* 图片加载的高度范围比例，默认为1.3，数字越大，预加载图片越多，数字越小，预加载图片数量越少 */
  /*  error: require('./assets/img/loading.gif'), *//* 加载错误的代替图片（使用 require 直接引入 src 中的图片） */
  loading: require('./assets/img/loading.gif')/* 加载时的 loading 图片（使用 require 直接引入 src 中的图片） */
});

Vue.use(iView);
// 配置基础路径
/* axios.defaults.baseURL = 'http://localhost:1904'; */

// 请求拦截：发送token
axios.interceptors.request.use(config => {
  // 每次利用axios发起的请求，都会进入到这里
  // 添加token
  let token = localStorage.getItem('Authorization');
  if (config.url != '/login') {
    config.headers.Authorization = token;

  }
  return config;
}, error => {
  // 请求失败进入这个回调
  return Promise.reject(error);
});

// 响应拦截：校验token
axios.interceptors.response.use(res => {
  // 判断token是否校验成功
  // 校验不成功：过期或被伪造
  if (router.currentRoute.matched.some(item => item.meta.requiresAuth) && res.data.code == 401) {
    router.replace({
      path: '/login',
      query: {
        redirectTo: router.currentRoute.fullPath
      }
    })
  }
  return res;
}, error => {

  return Promise.reject(error);
});



Vue.config.productionTip = false;




new Vue({
  render: h => h(App),
  // 注入路由
  router,
  store,
}).$mount('#app')