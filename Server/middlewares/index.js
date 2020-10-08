
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
module.exports = app => {
    app.engine('art', require('express-art-template'))
    //读取Cookie签名
    var data = fs.readFileSync(path.resolve(__dirname, './checkSign.json'), 'utf-8')
    data = JSON.parse(data)
    console.log(data.Sign)
    app.use(cookieParser(data.Sign))
}

