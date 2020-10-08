const express = require('express')
const route = express.Router()
const views_path = 'chinese_views/public_views/'

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
    res.sendFile('F:\\XUEonlineGit\\Server\\views\\chinese_views\\public_views\\terTbale.html')
 })


//  <a href="/zh-cn/stunews">问题解答</a>

// 										</li>
// 										<li class=" right-view">
// 											<a href="/zh-cn/login">登录/注册</a>



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