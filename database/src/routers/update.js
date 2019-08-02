const express = require('express');

const Router = express.Router();

const {
    formatData
} = require('../utils')

const {
    update,
    mdelete
} = require('../db/mongo');


// 修改数据的接口
Router.patch('/', async (req, res) => {
    // 请求体中的参数会被express格式化到req.body
    // console.log('params:', req.params);
    // console.log('body:', req.body);

    // let opt = {};
    // for (let key in req.body) {
    //     // console.log('body:', req.body);
    //     opt[key] = req.body[key]
    // }
    // console.log("opt:", opt);
    let {
        productId,
        skuName,
        retailPrice
    } = req.body;
    // console.log('params:', req.params);
    console.log(productId,
        skuName,
        retailPrice);

    let result = await update('goods', {
        productId: productId
    }, {
        skuName: skuName,
        retailPrice: retailPrice
    });

    // console.log(result.result.n);

    if (result.result.n == 1) {
        res.send(formatData({
            code: 1000,
            msg: 'update success'
        }))
    } else {
        res.send(formatData({
            code: 250,
            msg: 'update fail'
        }))
    }
})

// 删除数据接口
Router.delete('/delete', async (req, res) => {
    // 动态路由: 参数id会被express格式化到req.params
    // console.log('body:', req.body)

    // console.log("参数", req.query);
    let opt = req.query;

    if (opt) {
        console.log("参数1", opt);
        let result = await mdelete('goods', opt);

        if (result.result.n == 1) {
            res.send(formatData({
                code: 1000,
                msg: 'delete success'
            }))
        } else {
            res.send(formatData({
                code: 250,
                msg: 'delete fail'
            }))
        }
    }



});

module.exports = Router;