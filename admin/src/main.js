import Vue from 'vue'
import App from './App.vue'
import router from './route';
import store from "./vuex"

Vue.config.productionTip = false

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
Vue.use(iView);


Vue.prototype.$axios = axios;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')