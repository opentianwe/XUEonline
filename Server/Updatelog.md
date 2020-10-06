# 2020/9/28 20:00 
## 1.0 修复 学生 25分钟后评论现在问题  
## 1.0.1 userTable2.js 日语版修改说明 

// 一天以增加
# 1.1.0 2020/9/29 1：42
### 1.1.0  braintree_route.js  修复了服务器cookie校验失败导致崩溃的bug 
### 1.1.1 翻译日语版  ter.js userTable.js   main.js 退出按钮 退出跳转到登录页面 ./login.html  
### 1.1.2 img 文件新增图片   老师一览下拉 变成 预约老师 和 老师入口   index.html 页面 首页加上图片  中日都修改了
### 1.1.3  双语版 页面可以通过 头部按钮互相跳转 


# 2020/9/29 8:29
### sendEmal.js 邮箱发送接口开启测试
### infop.js    付款接口增加了发送邮件通知
### infop.js    /checkout接口修改了错误的对象命名
### tview.js    修复了学生也能进入教师资料填写页面的bug
### 中日Paypal.js 修改 Error 判断为 status == 1   解决报错

#           14:18
## personal.art  修改了显示邮箱和手机号改为显示微信号 
## personal.art  使用模板语法判断是否为老师登录从而做出不同的响应
## tview.js      修改了渲染老师信息相关的关键字

###  页面添加logo 修改 main.js  修改css  修改了 header 背景颜色 1455行  
#### <strong>手机端logo位置有瑕疵 问题暂存</strong>
###  页面添加logo 修改 main.js  修改css  修改了 header 背景颜色 1455行  
#### <strong>手机端logo位置有瑕疵 问题暂存</strong>


# 2020/9/30 9:41
### main.js 修改翻译  解决手机端不显示切换语言版本按钮问题   
###   getmoengy.html jp getMoney.html 翻译  中日翻译
###   terTable 翻译   login.html 翻译  table.js 修改部分奇怪的问题



# 2020/9/30 11:42 ---Tian
### /ja_JP/js/table.js 翻译内容修改
### public/.html       修改了错误的邮箱
### public/.html       删除了底部导航的公司条款和新闻
###  public/.html       删除了底部导航的公司条款和新闻

# 2020/9/30 19:21 
### ./main.js 去掉了下面电话号码 
### userTable2.js  中日双版 增加当天显示颜色功能     



# 2020/9/30 19:28 ---Tian             
### ja_JP_ter.art      修复了不显示图片和视频的问题
### style2.css         修改了表格宽度为95px
### /ja_JP/style2.css  修改了表格宽度为95px
### main.js            应要求将日语版切换按钮改成英文
### style2.css          注释掉了语言切换按钮旁边的after伪类
### /ja_JP/style2.css   注释掉了语言切换按钮旁边的after伪类
### style2.css         表格宽度他又嫌太窄了改成119px
### /ja_JP/style2.css  表格宽度他又嫌太窄了改成119px

# 2020/9/30 22:56 
### jp-index.html     解决部分业务介绍卡片塌陷高度不一问题
### 修改了 日语版 personal.art 的翻译 
### 增加 personal.art 双语版 超出高度显示滚动条
### 修改了部分style.css 解决老师按钮点击不够宽问题
# <strong> personal.art  中日版本表格操作注意事项 表格的时间 和表格的名姓 谨慎操作 userTable 和提交按钮的值 有经过这两个值判断的</strong>

### 2020/10/1 18:10 ---Tian
### ja_JP_personal.art  修复了日语版预约信息显示问题
### ja_JP_personal.art  翻译了中文显示为日语
### tview.js            修改了ja_JP_personal渲染接口
### views./             修改了错误的邮箱

# 2020/10/01 11:00
### 修改了jp-paypal.js  提示翻译 
### 修改了jp-table.js 的翻译
# 2020/10/01 14:16
### 修复 jp—personal  jp-logoin  两个页面导航条 跳转到 personal 的问题
### 修改 中日双版本 index.html 多加一个 加号 修改 style2.css 中日双版本  
### 翻译 jp-userTable.js  jp-getMoeny.js 提示
### 翻译 jp-server.js  jp-paypal.js 提示
### 修复 jp-userTable.js  teacherEvaluation APi 接口 ../问题
### 修改 中日双 css 里面的 getMoeny.css 的部分样式
### 中日 jp-getMoeny.js  jp-PayPal 购买积分提示 修改为 积分 付款金额 税后实际付款金额 税率
# 2020/10/01 22:11
### 解决退出按钮 点击事件bug 竟然触发不了 我吐了
### 修改了 支付页面 cookie 未登录 
### 新增 404页面 有的请求不到的页面可以到404.html 中日都有

### 2020/10/1 23:14 ---Tian
### tview.js             修复了日语版页面重定向错误的问题
### app.js               新增了访问到空页面会自动重定向到404页面
# 2020/10/2 20:30
### 新增 初学者指南页面 snewtit.html 
### 修改main.js
### 修复 120 一个➕问题
# 2020/10/2 23/51
###  personal 少个 # 
### 感觉少了个评价时间
### 因为老师对学生时可以两次评价的 但是老师只显示了一次

#  2020/10/2  22:07 ---Tian
### personal.art         学生评价老师评价渲染不同
### ja_JP_personal.art   学生评价老师评价渲染不同
### tview.js             增加ProfileRendering函数负责个人资料页面渲染(包括老师和学生评价渲染)
### personal.art         老师和学生评价开启渲染（目前只开放中文版）
### alipay_route.js      修复了未登录状态下跳转404问题

# 2020/10/3  10:43 ---Tian
### msOp.js              评价提交时自动提交当前时间
### tview.js             增加渲染了评价时间
### 设定了git邮箱通知
# 2020/10/3 23:34 
### getMoeny  jpgetMoeny  把日语版的牵制到 中文版 
### 修改了 中文版 的 getMoengy 的css 链接 直接链接到 ./jp/css/getMoeny.css
### 修改中文支付判断方式提示

# 2020/10/5 12:19 ---Tian
### 修复了所有请求都会跳转到404的bug

# 2020/10/5 12:45 
###  修改 header 头部 skype id  增加打开skype软件
### 修改index.html 页面小瑕疵



# 2020/10/5 21：09 ---Tian
### braintree_route.js 废弃了付款接口
### paypal.js          新增git了checkout接口用来代替之前的接口    

### 修改peronal.att 修改style.css 修改按钮样式
### 修改中日 ter.art 问题
### getMoeny.js 里面的登录
### 账号 sb-9tgm63379560@personal.example.com 密码 X(saW3.d
### Temp 中文 true 日文 false 

# 2020/10-6 8:03 
### jaJP 修复teacherdata img 太大问题