const { link } = require('fs')
const paypal = require('paypal-rest-sdk')
const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const mysql = require('../msOp')
const ord = require('../controller/order')
const ServiceCharge = 0.1  //手续费调整
router.use(cookieParser("wcasd2398123asd12aasd"))
paypal.configure({
    mode: 'sandbox',
    client_id: 'AVw7MslWx1G_4s0vO5Ao1kITw9M1YAZEOCbIzVFoUjtH_pQ4P_rzgCk-tA1iKlUGsCKtNcPsJfHq3jHs',
    client_secret: 'EMUyaKs-TSk4kxJ5X2jUoYvnsuoDkm8pqt8jONQ6clSUVhnLBqjPNskAW2OapQFzlDN6OaAmycYElV27'
})

async function creatPaypal(OrderNumber, OrderAmount) {
    var payReq = JSON.stringify({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://127.0.0.1/process',
            cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
            amount: {
                total: OrderAmount,
                currency: 'JPY'
            },
            description: OrderNumber
        }]
    });
    return new Promise((resove, reject) => {
        paypal.payment.create(payReq, function (error, payment) {
            var links = {};
            if (error) {
                console.error(JSON.stringify(error));
            } else {
                payment.links.forEach(function (linkObj) {
                    links[linkObj.rel] = {
                        href: linkObj.href,
                        method: linkObj.method
                    };
                })
                if (links.hasOwnProperty('approval_url')) {
                    resove(links.approval_url.href)
                } else {
                    resove(null)
                }
            }
        })
    })
}





/*
* 2020/10/05 --Tian
* paypal付款接口
*/

router.post('/checkout', (req, res) => {
    if (req.signedCookies.malli == undefined) {
        res.send(
            {
                status: 0,
                msg: "请登录账号后再来充值!"
            })
        return
    }
    if (req.body.CommodityID == undefined) {
        res.send(
            {
                status: 0,
                msg: "商品信息异常!"
            })
        return
    }

    async function checkout(Emal, CommodityID) {
        var ret = await mysql.asyncqueryCommodityInfoByID(CommodityID)
        if (ret == null) {
            resove({ status: 0, msg: "商品信息异常!" })
        }
        var Yen = Number(ret.Yen)    //商品价格 日元

        var ActualPayment = Yen + (Yen * ServiceCharge) //加上手续费的实际价格

        //开始创建订单
        return new Promise((resove, reject) => {
            var order = new ord(CommodityID, Emal, 2, false)
            order.Creat(function (data) {
                if (!data) {
                    resove({ status: 0, msg: "订单信息异常,请刷新页面重试!" })
                }
                //生成Url
                creatPaypal(String(data.number), String(ActualPayment))
                    .then((data) => {
                        if (!data) {
                            resove({ status: 0, msg: "订单信息异常,请刷新页面重试!" })
                        }
                        resove({ status: 1, Url: data })
                    })
            })
        })
    }
    checkout(req.signedCookies.malli, req.body.CommodityID)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
})

router.post('/tocheckout', (req, res) => {
    if (req.body.CommodityID == undefined || req.signedCookies.malli == undefined || req.signedCookies.malli == '' || req.signedCookies.malli == null) {
        res.send({
            status: 0,
            msg: "Cookies校验失败!,请跳转到登录页"
        })
        return
    }
    var CommodityID = req.body.CommodityID
    if (CommodityID == '' || CommodityID == undefined) {
        res.send({ status: 144, msg: "数据异常!" })
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
                res.send({ status: 145, msg: "数据库商品信息异常!" })
            }
        } else {
            res.send({ status: 146, msg: "数据库商品信息异常!" })
        }
    })
})

router.get('/process', function (req, res) {
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
            console.error(JSON.stringify(error));
        } else {
            if (payment.state == 'approved') {
                console.log(payment)
                console.log('payment completed successfully');
            } else {
                console.log('payment not successful');
            }
        }
    });
})
module.exports = router