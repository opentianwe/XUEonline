const express = require('express')
const route = express.Router()
const views_path = 'chinese_views/public_views/'
const views_components_path = 'chinese_views/public_components/'

const mysql = require('../../msOp')
const url = require('url')

const views_table = require('../../helpers/views_table')
const model_inf = require('../../models/Userinformation')
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





/**
 * @ 个人资料页面
 */
route.get('/perdata', (req, res) => {
  var mem
  mysql.queryPointsbyemal(req.signedCookies.malli, function (data, err) {
    if (data == undefined || data.length == 0 || data == null || err) {
      mem = 0
    } else {

      mem = data[0].integral

    }

    mysql.queryUserPbyEmal(req.signedCookies.malli, function (data, err) {
      if (data == undefined || data.length == 0 || data == null || err) {
        mysql.queryUserTbyEmal(req.signedCookies.malli, function (data, err) {
          if (data == undefined || data.length == 0 || data == null || err) {
            res.redirect('/')
            return
          } else {
            mysql.seleteTAppointment(req.signedCookies.malli)
              .then(function (datas) {
                var Str = ''
                var temp = []
                var temparr = []
                var isExist = false;

                for (var i = 0; i < datas.length; i++) {
                  isExist = false;
                  temp = datas[i];
                  for (var j = 0; j < temparr.length; j++) {
                    if (temp.timeApp.split('  ')[0] == temparr[j].timeApp.split('  ')[0]) {
                      isExist = true;
                      break;
                    }
                  }
                  if (!isExist) {
                    temparr.push(temp)
                  }
                }
                for (var i = datas.length - 1; i >= 0; i--) {
                  if (datas[i].UserWeChat == null) {
                    datas[i].UserWeChat = "无"
                  }
                  Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].UserName + '</td><td class="TeacherWeChatID">' + datas[i].UserWeChat + '</td><td class="TeacherSkypeID"><a href="skype:' + datas[i].UserSkypeID + '?add">' + datas[i].UserSkypeID + '</a></td>' + '<td>' + datas[i].Price + '</td>' + ' <td> <button type="button" class="layui-btn Studtit">评价</button></td></tr>'
                  //ZPrice += Number(datas[i].Price)
                }
                views_table.ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, true)
              }, function (err) {
                var Str = "暂无预约信息!"
                views_table.ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, true)
              })


          }

        })

      } else {
        mysql.seleteAppointment(req.signedCookies.malli)
          .then(function (datas) {
            var Str = ''
            for (var i = datas.length - 1; i >= 0; i--) {

              Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].TeacherName + '</td><td class="TeacherWeChatID">' + datas[i].TeacherWeChat + '</td><td class="TeacherSkypeID"><a href="skype:' + datas[i].TeacherSkypeID + '?add">' + datas[i].TeacherSkypeID + '</td>' + '<td>' + datas[i].Price + '</td>' + '<td class="button-user"> <button type="button" class="layui-btn Teachertit">评价</button></td></tr>'

            }
            views_table.ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, false)

          }, function (err) {
            var Str = "暂无预约信息!"
            views_table.ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, false)
          })


      }
    })

  })
})



/**
 * @ 老师资料修改填写页面
 * @ 老师专属页面
 * @ 需要判断req.Grend权限
 */
route.get('/iputinfo', (req, res) => {
  if(req.Grend == null)
  {
    res.redirect("./")
      return
  }
  var parseObj = url.parse(req.url, true)
  req.query = parseObj.query
  console.log(req.signedCookies.malli)
  views_table.TRenderTable(req.signedCookies.malli, req.query.yyyy, req.query.mm, req.query.dd, function (data) {
    res.render(views_path + 'iputinfo.art', { data: { Timp: data } })
  })
})

module.exports = route