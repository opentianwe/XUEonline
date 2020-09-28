const express = require("express")
const route = require("./route/index")
const sendemal = require('./controller/sendEmal')
const port = 80
var app = express()

sendemal.sendEmalTeacher("1206047095@qq.com","tian","chen","2014-02-22",true)
// sendemal("1206047095@qq.com","11")
app.use(express.static("public"))
//挂载子路由
route(app)

app.listen(port,function(){ 
    console.log("app is running!")
 })
