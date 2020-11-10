const express = require("express")
const route = require("./route/index")
// const main = require('./controllers/main')
const index = require('./middlewares/index')
// const text = require('./tests/text')
const port = 80
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

//挂载子路由
app.listen(port, function () {
    console.log("app is running!")
})






