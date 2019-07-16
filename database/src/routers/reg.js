const express = require('express');

const Router = express.Router();

const {
    formatData
} = require('../utils')

const {
    insert,
    find
} = require('../db/mongo');

Router.post('/', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    let data = await insert('user', req.body);
    res.send(formatData())
})

// 验证用户名是否存在
Router.get('/check', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    let {
        username,
    } = req.query;

    let result = await find('user', {
        username,
    });

    if (result.length > 0) {
        res.send(formatData({
            code: 1000,
            msg: '该用户已存在'
        }))
    } else {
        res.send(formatData({
            code: 250,
            msg: '该用户不存在存在'
        }))
    }

})

module.exports = Router;