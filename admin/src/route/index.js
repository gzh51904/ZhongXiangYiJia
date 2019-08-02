import Vue from "vue"

import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter)


//引入页面组件
import HelloWorld from '../components/HelloWorld'
import Goodlist from '../pages/Goodlist'
import Fenleilist from '../pages/Fenleilist'
import Fenchild from '../pages/Fenchild'
import Changelist from '../pages/Changelist'
import Addlist from '../pages/Addlist'
//实例化router配置参数

let router = new VueRouter({
    //配置信息
    routes: [{
            name: "HelloWorld",
            path: "/helloWorld",
            component: HelloWorld
        }, {
            name: "Goodlist",
            path: "/goodlist",
            component: Goodlist
        },
        {
            name: "Fenleilist",
            path: "/fenleilist",
            component: Fenleilist
        },
        {
            name: "Fenchild",
            path: "/fenchild",
            component: Fenchild
        },
        {
            name: "Changelist",
            path: "/changelist",
            component: Changelist
        },
        {
            name: "Addlist",
            path: "/addlist",
            component: Addlist
        },
    ]

})

export default router;