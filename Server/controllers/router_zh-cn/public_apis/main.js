const express = require('express')
const route = express.Router()
const post_reg_log = require('./post_reg_log')
const post_info = require('./post_info')
route.use(post_reg_log)
route.use(post_info)

module.exports = route

