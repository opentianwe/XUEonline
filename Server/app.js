const express = require("express")
const route = require("./route/index")
const main = require('./controllers/main')
const index = require('./middlewares/index')
const port = 80
var app = express()
app.use(express.static("public"))
index(app)
// main(app)
route(app)
app.get('/', function (req, res) {
    // if(req.acceptsLanguages()[0].toLowerCase() == 'zh-cn')
    // {
    //     res.redirect('/zh-cn')
    // }else
    // {
    res.redirect('/ja-jp')
    // }
})

//挂载子路由
app.listen(port, function () {
    console.log("app is running!")
})






