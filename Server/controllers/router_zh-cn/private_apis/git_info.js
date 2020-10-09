const express = require('express')
const mysql = require('../../../msOp')
const url = require('url');
const router = express.Router()


  

router.get('/userinfo', function (req, res) {
    mysql.queryUserinformbyEmal(req.signedCookies.malli, function (data, err) {
        if (err || data.length == 0) {
            res.send({
                state: 0,
                msg: "Cookies校验失败!,请跳转到登录页"
            })
            return;
        }
        res.send(data[0])
    })
})

router.get('/isfirst', function (req, res) {
    mysql.queryUserinformbyEmal(req.signedCookies.malli, function (data, err) {
        if (err || data.length == 0) {
            res.send({
                state: 0,
                msg: "Cookies校验失败!,请跳转到登录页"

            })
            return;
        }
        if (data[0].isfirst == null || Number(data[0].isfirst) == 0) {
            res.send({
                status: 0,
                msg: "首次登录资料未提交"
            })
        } else {
            res.send({
                status: 1,
                msg: "资料已提交"
            })
        }
    })
})




module.exports = router