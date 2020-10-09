const express = require('express')
const route = express.Router()
const views_path = 'chinese_views/public_views/'
const fs = require('fs')
const path = require('path')




/**
 * @@ Index渲染
 * @@ Tian 2020/10/ 1:25
 */
route.get("/", (req, res) => {
    res.render(views_path + 'index.art')
})

/**
 * 
 * @@ 充值页面渲染 原getmoeny.html 改名 recharge.art
 *
 */ 
 
 route.get('/recharge',(req,res)=>{
    res.render(views_path + 'recharge.art')
 })


/**
 * @ 老师列表渲染 和模板引擎冲突 暂时不处理
 */
 
 route.get('/tshow',(req,res)=>
 {
    fs.readFile('F:\\XUEonlineGit\\Server\\views\\chinese_views\\public_views\\terTbale.html','utf-8',(err,data)=>{
      var str_array = data.match(/{{{(\w+\s)\'([^\']*)\'}}}/g)
      var html = data
      var reg = RegExp(/\'([^\"]*)\'/)
      var views_path = path.join(__dirname,"../../views/chinese_views")
         for(var i = 0; i < str_array.length; i++)
         {
            var view_path = views_path + reg.exec(str_array[i])[1].replace('/','\\')
            var data = fs.readFileSync(view_path,'utf-8')
            html = html.replace(str_array[i],data)
         }
         res.send(html)
    })
 })




/**
 * @ 问题解答页面
 */
route.get('/stunews',(req,res)=>{
   res.render(views_path + 'stunews.art')
})




/**
 * @ 登录注册页面
 */
route.get('/login',(req,res)=>{
   res.render(views_path + 'login.art')
})
module.exports = route