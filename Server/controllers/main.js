const zh_cn = require('./router_zh-cn/main_zh-cn')
const ja_jp = require('./router_ja-jp/main_ja-jp')

module.exports = app => {

    //Cookie权限获取
    // route.use((req,res,next)=>{
    //     req.Grade = model_inf.appraisal_authority(req.signedCookies.malli)
    //     next()
    // })

    app.use('/zh-cn',zh_cn)

    app.use('/ja-jp',ja_jp)
}
