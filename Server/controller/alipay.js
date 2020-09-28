const AlipaySDK = require("alipay-sdk").default
const AlipayFormData = require("alipay-sdk/lib/form").default
const fs = require("fs")
const path = require("path")
const { createContext } = require("vm")
class AlipayContotller {
	async index(number,$,name,callback){
		const alipaySdk = new AlipaySDK({
			appId:"2021001191659808",
			privateKey:fs.readFileSync(path.join(__dirname,"../config/pem/app_private_key.pem"),"ascii")
			,//私匙
			signType:"RSA2",
			alipayPublicKey:fs.readFileSync(path.join(__dirname,"../config/pem/alipay_public_key.pem"),"ascii")
			,//支付宝公匙
			gateway:"https://openapi.alipay.com/gateway.do"//网关地址
			,
			timeout:5000,//网关超时时间
			camelcase:true//是否把网关返回的下划线key转换为驼峰写法
		})
		const formData = new AlipayFormData();
		formData.setMethod("get")
		formData.addField("appId","2021001191659808")
		formData.addField("charset", "utf-8");
		formData.addField("signType", "RSA2");	
		formData.addField("bizContent",{
			outTradeNo:number,//商户订单号
			productCode:"FAST_INSTANT_TRADE_PAY",//产品销售码
			totalAmount:$,//订单总金额
			subject:name,//订单标题
			body:"test"//订单描述
		})
		formData.addField('returnUrl', 'http://www.haominjiaoyu.com/personal.html'); // 客户端支付成功后会同步跳回的地址
		formData.addField('notifyUrl', 'http://www.haominjiaoyu.com/AlipayRecharge'); // 支付宝在用户支付成功后会异步通知的回调地址，必须在公网 IP 上才能收到
		const result = await alipaySdk.exec("alipay.trade.page.pay",{},{formData});
		callback(result)
	}

}

module.exports = AlipayContotller