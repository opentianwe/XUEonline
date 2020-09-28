const braintree = require('braintree');
const { response } = require('express');
const express = require('express')
const router = express.Router()
const mysql = require('../msOp')
const toos = require('../Toos')
const ord = require('../controller/order')
const cookieParser = require('cookie-parser')
const ServiceCharge = 0.1  //手续费调整
const geteway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "qbb7ntvr2yy53fnk",
    publicKey: "5r28s85g6t276qb6",
    privateKey: "a1c1e6113ebb5aca0abd2c22cbb2a787"
})

router.use(cookieParser("wcasd2398123asd12aasd"))


router.get('/1.html', (req, res) => {
    geteway.clientToken.generate({}, (err, response) => {
        if (response.clientToken == undefined) {
            res.render('<h1>PayPal网关服务器异常</h1>')
            return
        }
        res.render('1.art', { data: response.clientToken })
    })
})

router.post('/checkout', (req, res) => {
    if (req.body.CommodityID == undefined || req.signedCookies.malli == undefined) {
        res.send({
            state: 0,
            msg: "Cookies校验失败!,请跳转到登录页"
        })
        return
    }
    if (req.body.nonce == '' || req.body.nonce == undefined) {
        res.send({ status: 0, msg: "数据异常!" })
        return
    }

    var CommodityID = req.body.CommodityID
    var nonceFromTheClient = req.body.nonce


    async function checkout(Emal, CommodityID, nonceFromTheClient) {

        var ret = await mysql.asyncqueryCommodityInfoByID(CommodityID)
        if (ret == null) {
            return { error: 101, msg: "未找到相关商品信息!" }
        }
        var Yen = Number(ret.Yen)
        var integral = ret.integral
        if (Yen == 0 || integral == 0) {
            return { error: 102, msg: "商品价格信息有误请联系网站管理员!" }
        }
        var ActualPayment = Yen + (Yen * ServiceCharge)
        //查询用户ID
        ret = await mysql.asyncqueryUserPbyEmalPromise(Emal)
        if (ret == null) {
            ret = await mysql.asyncqueryUserTbyEmal(Emal)
            if (ret == null) {
                return { error: 104, msg: "未找到相关用户信息!" }
            }
        }
        var ID = ret.ID

        //开始付款
        ret = await geteway.transaction.sale({
            amount: ActualPayment,
            paymentMethodNonce: nonceFromTheClient,
            // deviceData: "1111",
            options: {
                submitForSettlement: true
            }
        })
        if (ret == undefined || ret == null) {
            return { error: 103, msg: "付款过程遇到了未知的错误!" }
        }
        if (ret.success) {

            console.log(ret)
            const order = new ord(CommodityID, Emal, 2, true)
            order.Creat(function (data) { })//生成订单
            console.log(Emal)
            ret = toos.aUpdatePoints(integral, Emal, ID)
            if (ret) {
                return { error: 1, msg: "付款成功!" }
            } else {
                return { error: 105, msg: "付款已经成功,但是积分数据库异常,请将此截图并发给网站管理员" }
            }
        } else {
            switch (ret.message) {
                case 'Cannot use a payment_method_nonce more than once.':
                    return { error: 2, msg: "该订单已付款请勿重复付款!" }
                default:
                    return { error: 3, msg: ret.message }
            }
        }
    }
    checkout(req.signedCookies.malli, CommodityID, nonceFromTheClient)
        .then((data) => {
            res.send(data)
        })
})

router.post('/tocheckout', (req, res) => {
    if (req.body.CommodityID == undefined || req.signedCookies.malli == undefined || req.signedCookies.malli == '' || req.signedCookies.malli == null) {
        res.send({
            state: 0,
            msg: "Cookies校验失败!,请跳转到登录页"
        })
        return
    }
    var CommodityID = req.body.CommodityID
    if (CommodityID == '' || CommodityID == undefined) {
        res.send({ status: 0, msg: "数据异常!" })
        return
    }
    mysql.queryCommodityInfoByID(CommodityID, function (data, err) {
        if (data) {
            if (data != null && data[0].Yen != undefined && data[0].Yen != '' && data[0].Yen != null && data[0].Yen != 0) {
                var $ = Number(data[0].Yen) + (Number(data[0].Yen) * 0.1)
                console.log($)
                res.send({
                    money: Number(data[0].Yen),
                    Amountactuallypaid: $,
                    taxRate: "10%",
                    integral: data[0].integral
                })
            } else {
                res.send({ status: 0, msg: "数据库商品信息异常!" })
            }
        } else {
            res.send({ status: 0, msg: "数据库商品信息异常!" })
        }
    })
})

module.exports = router