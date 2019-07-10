import Vue from 'vue'

import App from './App.vue';

// 路由
import router from "./router";

// ajax模块
import axios from "axios";

// 设置到原型
Vue.prototype.$axios=axios;

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  // 注入路由
  router,
}).$mount('#app')
