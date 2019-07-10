// import Vue from "vue";
// import VueRouter from "vue-router"

// // 底部四件套
// import Home from '../Foot/Home'
// import Classify from '../Foot/Classify'
// import Cart from '../Foot/Cart'
// import Mine from "../Foot/Mine";


// Vue.use(VueRouter);

// const router = new VueRouter({
//     routes: [{
//             name: "Home",
//             path: "/home",
//             components: Home
//         },
//         {
//             name: "Classify",
//             path: "/classify",
//             components: Classify

//         }, {
//             name: "Cart",
//             path: "/cart",
//             components: Cart

//         }, {
//             name: "Mine",
//             path: "/mine",
//             components: Mine
//         }
//     ]
// })


// export default router

import Vue from "vue"

//VueRouter的使用步骤
//1、引入
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引入页面组件
import Home from '../Foot/Home'
import Classify from '../Foot/Classify'
import Cart from '../Foot/Cart'
import Mine from "../Foot/Mine"



//实例化router配置参数

let router = new VueRouter({
    //配置信息
    routes: [{
        name: "Home",
        path: "/home",
        component: Home,
     
    }, {
        name: "Classify",
        path: "/classify",
        component: Classify,
     
    }, {
        name: "Classify",
        path: "/classify/:category",
        component: Classify,
     
    },{
        name: "Cart",
        path: "/cart",
        component: Cart,
      
    }, {
        name: "Mine",
        path: "/mine",
        component: Mine,
     
    } ]
})

export default router;