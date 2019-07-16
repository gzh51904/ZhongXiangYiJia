const express = require('express');


const {
    formatData
} = require('../utils');
const Router = express.Router();


// const mysql = require('mysql');
const {
    mysql: query
} = require('../db');

// //创建连接对象，并配置参数
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'xiaomiyoupindb'
// });

//创建连接池
// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'xiaomiyoupindb',
//     multipleStatements: true
// });


Router.route('/')
    // 获取所有商品
    .get((req, res) => {
        // 读取数据库，并返回数据
        // connection.connect();

        // // // 查询数据库
        // connection.query('select * from users', function (error, results, fields) {
        //     if (error) throw error;
        //     // 关闭连接,释放资源
        //     connection.end();

        //     console.log(results);

        //     res.send(results);
        // });
        // send('成功');

        // pool.query('select * from users', function (error, data) {
        //     res.send(data)
        // });
        // let sql = 'select * from goods';
        // query(sql).then(data => {
        //     res.send(formatData(data));
        // }).catch(err => {
        //     res.send(err);
        // })

        query('select * from goods').then(function (data) {
            // data: promise对象改成resolve状态时传回的参数
            res.send(formatData({
                data
            }))
        }, (err) => {
            res.send(formatData({
                data: err,
                code: 250
            }))
        })
    })



    // 删除单个商品
    .post((req, res) => {
        console.log('params:', req.params);

        let id = Date.now();

        res.send({
            code: 1000,
            data: [],
            msg: `添加商品${id}成功`
        })
    });



Router.route('/:id')

    // 修改单个商品
    // .put((req, res) => {
    //     // 请求体中的参数会被express格式化到req.body
    //     // console.log('params:', req.params);
    //     // console.log('body:', req.body);

    //     let {
    //         id
    //     } = req.params;

    //     res.send({
    //         code: 1000,
    //         data: [],
    //         msg: `修改商品${id}成功`
    //     })
    // })
    .patch((req, res) => {
        // 请求体中的参数会被express格式化到req.body
        console.log('params:', req.params);
        console.log('body:', req.body);

        let {
            id
        } = req.params;

        let opt = ''; // name="xxx", price="998"
        for (let key in req.body) {
            opt += `${key}='${req.body[key]}',`
        }

        // 去除多余逗号
        opt = opt.slice(0, -1)


        let sql = `update goods set ${opt} where id=${id}`;

        query(sql).then(data => {
            res.send(formatData({
                data
            }))
        }).catch(err => {
            res.send(formatData({
                data: err,
                code: 250
            }))
        })

    })



    // 获取单个商品
    .get((req, res) => {
        // 动态路由: 参数id会被express格式化到req.params
        let {
            id
        } = req.params;
        // console.log('params:', req.params)

        // pool.query(`select * from goods where username="${id}"`, function (error, data) {
        //     res.send(formatData(data))
        // });

        query(`select * from goods where id=${id}`).then(function (data) {
            // data: promise对象改成resolve状态时传回的参数
            res.send(formatData({
                data
            }))
        }, (err) => {
            res.send(formatData({
                data: err,
                code: 250
            }))
        })
    })

    // 删除单个商品
    .delete((req, res) => {
        // 动态路由: 参数id会被express格式化到req.params
        let {
            id
        } = req.params;
        console.log('params:', req.params)

        res.send({
            code: 1000,
            data: [],
            msg: `删除id=${id}商品成功`
        })
    });


module.exports = Router;