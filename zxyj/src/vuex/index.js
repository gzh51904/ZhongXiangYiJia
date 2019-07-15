import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import cart from './modules/cart'



const store = new Vuex.Store({
    // state 模块化
    modules:{
        cart,
       
    },

});

export default store;