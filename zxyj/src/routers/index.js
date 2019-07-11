import Vue from "vue"

//VueRouter的使用步骤
//1、引入
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引入页面组件
import Page from '../pages/Page.vue'
import List from '../pages/List.vue'
import Cart from '../pages/Cart.vue'
import Mine from '../pages/Mine.vue'


//实例化router配置参数

let router=new VueRouter({
    //配置信息
    routes:[{
        name:"Page",
        path:"/page",
        component:Page,
        template:`<div>首页</div>`
    },{
        name:"List",
        path:"/list", 
        component:List,
        template:`<div>分类</div>`
    },{
        name:"Cart",
        path:"/cart", 
        component:Cart,
        template:`<div>购物车</div>`
    },{
        name:"Mine",
        path:"/mine", 
        component:Mine,
        template:`<div>我的</div>`
    }
    ]
})

export default router;