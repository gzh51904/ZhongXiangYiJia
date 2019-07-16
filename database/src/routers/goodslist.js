const express = require('express');

const Router = express.Router();
const {
    formatData,
    token
} = require('../utils')

const {
    mongo: {
        find,
        insert
    }
} = require('../db');

// 获取所有商品
Router.get('/', async (req, res) => {
    let result = await find('goods');

    if (result.length > 0) {
        // res.send(result);
        res.send(formatData({
            code: 1000,
            data: result,
            msg: 'getgoodslist fail'
        }))
    } else {
        res.send(formatData({
            code: 250,
            msg: 'getgoodslist fail'
        }))
    }
})
// 获取单个商品

// 添加商品
Router.post('/', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    let data = await insert('goods', req.body);
    res.send(formatData({
        code: 1000,
        msg: '添加商品成功'
    }))
})

// 验证该商品是否已经存在
Router.get('/check', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    let {
        productId,
    } = req.query;

    let result = await find('goods', {
        productId,
    });

    if (result.length > 0) {
        res.send(formatData({
            code: 1000,
            msg: '该商品已存在'
        }))
    } else {
        res.send(formatData({
            code: 250,
            msg: '该商品还不存在'
        }))
    }

})

module.exports = Router;