const express = require('express')
const route = express.Router()
const public_views = require('./public_views')
const private_views = require('./private_views')
const model_inf = require('../../models/Userinformation')
const public_apis = require('./public_apis')
route.use(public_views) //无需cookie鉴权的页面
route.use(public_apis)
route.use(private_views)
module.exports = route