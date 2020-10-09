const express = require('express')
const route = express.Router()
const git_info = require('./git_info')
const file_update = require('./file_update')
const model_inf = require('../../../models/Userinformation')
route.get("*", (req, res, next) => {
    async function all() {
      var ret = await model_inf.appraisal_authority(req.signedCookies.malli)
      if (ret == 404) {
        return next()
      }
      else
        req.Grend = ret
      next()
    }
    all()
  })

route.use(git_info)
route.use(file_update)
module.exports = route

