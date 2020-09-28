const fs = require('fs');
const path = require('path');

// 这里配置基本信息
const AlipayBaseConfig = {
    appId: "2021001191659808",
    privateKey: fs.readFileSync(path.join(__dirname, "../config/pem/app_private_key.pem"), "ascii")
    ,//私匙
    signType: "RSA2",
    alipayPublicKey: fs.readFileSync(path.join(__dirname, "../config/pem/alipay_public_key.pem"), "ascii")
    ,//支付宝公匙
    gateway: "https://openapi.alipay.com/gateway.do"//网关地址
    ,
    timeout: 5000,//网关超时时间
    camelcase: true//是否把网关返回的下划线key转换为驼峰写法
};

module.exports = {
    AlipayBaseConfig: AlipayBaseConfig,	// 将配置模块暴露供初始化调用
}
