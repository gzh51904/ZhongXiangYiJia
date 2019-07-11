import Vue from "vue"

//VueRouter的使用步骤
//1、引入
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引入页面组件
import Home from '../Foot/Home'
import Classify from '../Foot/Classify'
import Cart from '../Foot/Cart'
import Mine from "../Foot/Mine";


// 首页跳转路由
import Uplibao from "../Home/Uplibao"
import Brand from "../Home/Brand"



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
        name: "Cart",
        path: "/cart",
        component: Cart,

    }, {
        name: "Mine",
        path: "/mine",
        component: Mine,

    }, {
        name: "Uplibao",
        path: "/uplibao/:target",
        component: Uplibao,
    }, {
        name: "Brand",
        path: "/brand/:target",
        component: Brand,
    }]
})

export default router;