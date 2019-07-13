import Vue from "vue"

//VueRouter的使用步骤
//1、引入
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter)


//引入页面组件
import Home from '../Foot/Home'
import Classify from '../Foot/Classify'
import Cart from '../Foot/Cart' /* 购物车页面 */
import Mine from "../Foot/Mine"
import Login from "../pages/login"
import Pay from "../pages/pay" /* 支付页面 */
import NewAddressList from "../pages/newAddressList" /* 添加地址 */
import Fydess from '../pages/Fydess'
//引入详情页组件
import Gooditem from "../pages/Gooditem" /*详情页面 */
import Personal from "../pages/personal" /*个人信息 */

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

        }, {
            /* 购物车页面 */
            name: "Cart",
            path: "/cart",
            component: Cart,
            // 本组件需要登录权限才可访问
            meta: {
                requiresAuth: true
            }

        }, {
            name: "Mine",
            path: "/mine",
            component: Mine,
            // 本组件需要登录权限才可访问
            meta: {
                requiresAuth: false
            }

        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        }, /* 支付订单 */
        {
            name: "Pay",
            path: "/pay",
            component: Pay,

        }, /* 添加地址页面 */
        {
            name: "NewAddressList",
            path: "/newAddressList",
            component: NewAddressList,

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

        }, {
            // 个人信息
            name: "Personal",
            path: "/personal",
            component: Personal,
        },
        {
            /* 详情页面 */
            name: "Gooditem",
            path: "/gooditem/:productId",
            component: Gooditem
        }, // 重定向
        {
            path: '/',
            redirect: '/home'
        }
    ]
})


/*    console.log('全局：beforeEach to',to); */

router.beforeEach((to, from, next) => {
    console.log('全局：beforeEach from', from);
    console.log('全局：beforeEach to', to);
    // 判断目标路由是否需要登录权限才可访问
    if (to.matched.some(item => item.meta.requiresAuth)) {
        let token = localStorage.getItem('Authorization');
        // let token = localStorage.getItem('User');
        axios.get('/verify')
        // 用户已登录
        if (token) {
            next();
        }
        // 用户未登录
        else {
            next({
                path: '/login',
                query: {
                    redirectTo: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})
export default router;