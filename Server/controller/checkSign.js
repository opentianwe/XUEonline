const psth = require('path')

const AlipaySDK = require('alipay-sdk').default

const alipayConfig = require('./alipay_config')

const alipaySDK = new AlipaySDK(alipayConfig.AlipayBaseConfig)

async function checkNotify(obj)
{
    const result = await alipaySDK.checkNotifySign(obj)
    return result;
}

module.exports = checkNotify

