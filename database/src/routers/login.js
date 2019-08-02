const express = require('express');

const Router = express.Router();
const {
    formatData,
    token
} = require('../utils')

const {
    mongo: {
        find
    }
} = require('../db');

Router.post('/', async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let result = await find('user', {
        username,
        password
    });

    if (result.length > 0) {
        let Authorization = token.create(password)

        res.send(formatData({
            data: Authorization
        }))
    } else {
        res.send(formatData({
            code: 250,
            msg: 'login fail'
        }))
    }

})

// 验证用户名是否存在
// Router.get('/', async (req, res) => {
//     let {
//         username,
//         password
//     } = req.query;

//     let result = await find('user', {
//         username,
//         password
//     });

//     if (result.length > 0) {
//         let Authorization = token.create(username)

//         res.send(formatData({
//             data: Authorization
//         }))
//     } else {
//         res.send(formatData({
//             code: 250,
//             msg: 'login fail'
//         }))
//     }

// })


module.exports = Router;