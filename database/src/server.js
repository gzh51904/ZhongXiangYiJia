const express = require('express');
//文件模块
const {
    port
} = require('./config.json');

//引入路由
const allRouter = require('./routers')

const app = express();

app.use(allRouter)

//静态资源服务器
app.use(express.static('./' /*,{maxAge:60*60*60,index:'login.html'}*/ ));

app.listen(1904, function () {
    console.log('server is running');

})