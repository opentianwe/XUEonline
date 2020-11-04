const express = require("express")
const route = require("./route/index")
const main = require('./controllers/main')
const index = require('./middlewares/index')
const port = 9980
var app = express()
app.get('/', function (req, res) {
    // if(req.acceptsLanguages()[0].toLowerCase() == 'zh-cn')
    // {
    //     res.redirect('/zh-cn')
    // }else
    // {
    res.redirect('./ja_JP/index.html')
    // }
})
app.use(express.static("public"))
index(app)
// main(app)
route(app)
// function getCurrentTime(t) {
//     //t为时区参数  默认东八区北京时间
//     if (!t) t = 8;
//     const time = new Date();
//     const len = time.getTime();
//     const offset = time.getTimezoneOffset() * 60000; //本地时间与GMT时间差值
//     const utcTime = len + offset;  //格林尼治时间
//     const date = new Date(utcTime + 3600000 * t); //格林尼治时间和当前时区差值
//     const y = date.getFullYear(),
//         mon = date.getMonth() + 1,
//         d = date.getDate(),
//         h = date.getHours(),
//         m = date.getMinutes(),
//         s = date.getSeconds();
//     //不足两位补0
//     function addZero(value) {
//         if (value < 10) return "0" + value;
//         else return value;
//     }
//     const result = y + "-" + addZero(mon) + "-" + addZero(d) + " " + addZero(h) + ":" + addZero(m) + ":" + addZero(s);
//     return result

// }
//console.log( getCurrentTime(9));
//挂载子路由
app.listen(port, function () {
    console.log("app is running!")
})






