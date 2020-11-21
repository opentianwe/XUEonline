const { link } = require('fs')
const paypal = require('paypal-rest-sdk')
const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const mysql = require('../msOp')
const ord = require('../helpers/order')
const toos = require('../Toos')
const moddel = require("../models/OrderList")
const ServiceCharge = 0.1  //手续费调整
router.use(cookieParser("wcasd2398123asd12aasd"))
paypal.configure({
    mode: 'live',
    client_id: 'ATmqkOavZmZaVSuVdmnpjktArj6awVZXiB-Usu9CyU4sQo9w_6WDcB1wR6ZrJYwcbzWaHFtZJ45S3lzn',
    client_secret: 'EFhvaRbPl6z7j9fQ2q3CQQ8bxoYqO7-bxJOcqdfbYGfrh30uRr6UgPYBaLLVVbZcgtqHbZOwjnkZ9mr2'
})

const return_url = 'http://www.haominjiaoyu.com/process/zh_Cn'
const cancel_url = 'http://www.haominjiaoyu.com/cancel/zh_Cn'

const ja_JPreturn_url = 'http://www.haominjiaoyu.com/process/ja_JP'
const ja_JPcancel_url = 'http://www.haominjiaoyu.com/cancel/ja_JP'

async function creatPaypal(OrderNumber, OrderAmount, return_url, cancel_url) {
    var payReq = JSON.stringify({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: return_url,
            cancel_url: cancel_url
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
   // req.body = JSON.parse(req.body)
    console.log(req.body)
    async function checkout(Emal, CommodityID, return_url, cancel_url) {
        if(CommodityID == 0)
        {
           var a = await moddel.query_List(req.signedCookies.malli)
           if(!a)
           {
            res.send({ status: 145, msg: "198积分只能充值一次!" })
            return
           }
        }
        var ret = await mysql.asyncqueryCommodityInfoByID(CommodityID)
        if (ret == null) {
            resove({ status: 0, msg: "商品信息异常!" })
        }
        var Yen = Number(ret.Yen)    //商品价格 日元

        var ActualPayment = Yen + (Yen * ServiceCharge) //加上手续费的实际价格
        ActualPayment = ActualPayment.toFixed(0)
        //开始创建订单
        return new Promise((resove, reject) => {
            var order = new ord(CommodityID, Emal, 2, false)
            order.Creat(function (data) {
                if (!data) {
                    resove({ status: 0, msg: "订单信息异常,请刷新页面重试!" })
                    return
                }
                //生成Url
                creatPaypal(String(data.number), String(ActualPayment), return_url, cancel_url)
                    .then((data) => {
                        if (!data) {
                            resove({ status: 0, msg: "订单信息异常,请刷新页面重试!" })
                            return
                        }else
                        {
                            resove({ status: 1, Url: data })
                        }
                        
                    })
            })
        })
    }
    if (req.body.Temp == 'true') {
        checkout(req.signedCookies.malli, req.body.CommodityID, return_url, cancel_url)
            .then((data) => {
                console.log(data)
                res.send(data)
            })
    } else {
        checkout(req.signedCookies.malli, req.body.CommodityID, ja_JPreturn_url, ja_JPcancel_url)
            .then((data) => {
                console.log(data)
                res.send(data)
            })
    }
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
    async function query_List(){
        if(CommodityID == 0)
        {
           var a = await moddel.query_List(req.signedCookies.malli)
           if(!a)
           {
            res.send({ status: 145, msg: "198积分只能充值一次!" })
            return
           }
        }
        mysql.queryCommodityInfoByID(CommodityID, function (data, err) {
            if (data) {
                if (data != null && data[0].Yen != undefined && data[0].Yen != '' && data[0].Yen != null && data[0].Yen != 0) {
                    var $ = Number(data[0].Yen) + (Number(data[0].Yen) * 0.1)
                    res.send({
                        money: Number(data[0].Yen),
                        Amountactuallypaid: $.toFixed(0),
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
       
    }
    query_List()
    
})



router.get(/^\/process\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
    var retUrl = '../personal.html'
    var errorUrl = '../getmoeny.html'
    if(toos.isJap(req.url))
    {
        retUrl = '../ja_JP/personal.html'
        errorUrl = '../ja_JP/getmoeny.html'
    }

    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
            console.error(JSON.stringify(error));
        } else {
            if (payment.state == 'approved') {
                async function process(OrderNumber) {
                    var ret = await mysql.queryOrderinformation(OrderNumber)
                    if (ret.OrderStatus == 1) {
                        ret = await toos.aUpdatePoints(ret.integral, ret.Useremail, ret.UserID)
                        if (ret) {
                            ret = await mysql.setOrderstatus(OrderNumber, 2)
                            if (ret) {
                                res.redirect(retUrl)
                            } else {
                                res.redirect(errorUrl)
                            }
                        } else {
                            res.redirect(errorUrl)
                        }
                    } else {
                        res.redirect(errorUrl)
                    }
                }
                process(payment.transactions[0].description)
            } else {
                res.redirect(errorUrl)
            }
        }
    });
})



router.get(/^\/cancel\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
    var errorUrl = '../getmoeny.html'
    if(toos.isJap(req.url))
    {
        errorUrl = '../ja_JP/getmoeny.html'
    }   
    res.redirect(errorUrl)       
})


module.exports = router