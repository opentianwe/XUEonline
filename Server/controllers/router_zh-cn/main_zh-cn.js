const express = require('express')
const route = express.Router()
const public_views = require('./public_views')
const private_views = require('./private_views')
const public_apis_main = require('./public_apis/main')
const private_api_main = require('./private_apis/main')
route.use(public_views) //无需cookie鉴权的页面
route.use(public_apis_main)

route.use(private_views)
route.use(private_api_main)
module.exports = route