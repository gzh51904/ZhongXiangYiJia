import Vue from "vue"

//VueRouter的使用步骤
//1、引入
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter)


//引入页面组件
import Home from '../Foot/Home'
import Classify from '../Foot/Classify'
import Cart from '../Foot/Cart'
import Mine from "../Foot/Mine"
import Fydess from '../pages/Fydess'



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
        name: "Classify",
        path: "/classify/:category",
        component: Classify,
     
    },{
        name: "Cart",
        path: "/cart",
        component: Cart,
         // 本组件需要登录权限才可访问
        meta: { requiresAuth: false }
      
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
    }
       
     
   , {
        name: "Fydess",
        path: "/fydess/:categoryId",
        component: Fydess,
     
    }
   ]
})

router.beforeEach((to,from,next)=>{
    console.log('全局：beforeEach to',to);
     // 判断目标路由是否需要登录权限才可访问
     if(to.matched.some(item=>item.meta.requiresAuth)){
        let token = localStorage.getItem('User');
        axios.get('/verify')
        // 用户已登录
        if(token){
            next();
        }
        // 用户未登录
        else{
            next({
                path:'/login',
                query:{
                    redirectTo:to.fullPath
                }
            })
        }
    }else{
        next();
    } 
})
export default router;