const express = require("express")
const route = require("./route/index")
const port = 80
var app = express()
app.use(express.static("public"))
//挂载子路由
route(app)

app.listen(port,function(){ 
    console.log("app is running!")
 })
