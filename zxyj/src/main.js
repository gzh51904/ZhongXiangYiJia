import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'
import store from './vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.prototype.$axios = axios;
Vue.use(iView);
// 配置基础路径
/* axios.defaults.baseURL = 'http://localhost:1904'; */

// 响应拦截：校验token
axios.interceptors.response.use(res=>{
  // 判断token是否校验成功
  // 校验不成功：过期或被伪造

  if(router.currentRoute.matched.some(item=>item.meta.requiresAuth)){
    router.replace({
      path:'/login',
      query:{
        redirectTo:router.currentRoute.fullPath
      }
    })
  }
  return res;
}, error=>{
    // Do something with response error
    return Promise.reject(error);
});



Vue.config.productionTip = false;

import "./rem/rem.js";


new Vue({
  render: h => h(App),
  // 注入路由
  router,
  store,
}).$mount('#app')
