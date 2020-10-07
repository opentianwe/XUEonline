const express = require("express")
const route = require("./route/index")
const paypal = require('./route/paypal')
const port = 80
var app = express()
app.get('/zh-cn',function(req,res){
    res.render('index.art',{

    })
})
app.use(express.static("public"))
//挂载子路由
route(app)



app.listen(port, function () {
    console.log("app is running!")
})






