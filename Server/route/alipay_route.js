const alipay = require('../helpers/alipay')
const express = require('express')
const router = express.Router()
const ord = require('../helpers/order')

const cookieParser = require('cookie-parser')
const mysql = require('../msOp')
const checkSign = require('../helpers/checkSign')
const toos = require('../Toos')
router.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "Cookie,Content-type");
	//接收ajax请求手动提交的cookie信息
	res.header("Access-Control-Allow-Credentials", true);
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method == 'OPTIONS')
		res.sendStatus(200); //让options尝试请求快速结束
	else
		next();
});

router.use(cookieParser("wcasd2398123asd12aasd"))




router.get('/alipay', function (req, res) {
	if (req.query.CommodityID == undefined || req.signedCookies.malli == undefined) {
		res.send({
			status: 0,
			msg: "Cookies校验失败!,请跳转到登录页",
			Url:'./logoin.html'
		})
		return
	}
	const order = new ord(req.query.CommodityID, req.signedCookies.malli)
	order.Creat(function (params) {
		if (params == null) {
			res.send({
				status: 1,
				msg: "订单生成错误"
			})
		}
		const alip = new alipay()
		alip.index(params.number, params.$, params.Orname, function (apUrl) {
			res.send({ status: 0, Url: apUrl })
		})

	})

})


router.post('/AlipayRecharge', function (req, res) {
	async function checkResult(postData) {
		let result = await checkSign(postData)
		if (result) {

			var data = {
				trade_no: postData.trade_no,
				buyer_id: postData.buyer_id,
				total_amount: postData.total_amount,
				receipt_amount: postData.receipt_amount,
				invoice_amount: postData.invoice_amount,
				buyer_pay_amount: postData.buyer_pay_amount,
				gmt_create: postData.gmt_create,
				gmt_payment: postData.gmt_payment,
				out_trade_no: postData.out_trade_no
			};
			let Orinfo = await mysql.queryOrderinformation(data.out_trade_no)
			if (Orinfo) {
				try {
					let amount = JSON.parse(postData.fund_bill_list)
					if (amount[0].amount == Orinfo.OrderAmount) {
						let ret = toos.aUpdatePoints(Orinfo.integral, Orinfo.Useremail, Orinfo.UserID)
						if (ret) {
							let ret = mysql.setOrderstatus(data.out_trade_no,2)
							if(ret)
							{
								let ret = mysql.CreatAppinfo(data)
								if(ret)
								{
									console.log(data)
									console.log(Orinfo)
									console.log('付款成功')
									res.end('success');
								}
							}
						}
					}

				}
				catch (e) {
					console.log(e)
					return
				}
			}

		}
	}
	checkResult(req.body)



})

module.exports = router