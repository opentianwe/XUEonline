const express = require('express')
const route = express.Router()
const views_path = 'chinese_views/public_views/'
const model_inf = require('../../models/Userinformation')
const mysql = require('../../msOp')
route.get("*",(req,res,next)=>{
    async function all()
    {
        var ret = await model_inf.appraisal_authority(req.signedCookies.malli)
        if(ret == 404)
        {
          res.redirect("./") 
        }
        else
            next()
    }
    all()
  })

//渲染personal.html
async function ProfileRendering(res, Emal, mem, oAName, oAEmail, oAsex, oAskype, Str, isTeacher) {
  var Evaluation = ''
  var Price = 0
  if (isTeacher) {
      var ret = await mysql.queryStudentEvaluationByEmal(Emal)
      if (ret == false) {
          Evaluation = "暂无评价"
      } else {
          for (var i = 0; i < ret.length; i++) {
              var date = new Date(ret[i].Ptime);
              var datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              Evaluation += `
              <div>
              <p class='t-tit'>
              ${ret[i].Pmsg} 
              </p>
                  <div class='t-rigth'>来自学生${ret[i].UserName}的评价 
                  <br>
                  评价时间:<strong>${datetime}</strong></div>
               </div>
              `

          }

          ret = await mysql.queryTStudentEvaluationByEmal(Emal)
          if (ret == false) {
              Price = 0
          } else {
              for (var i = 0; i < ret.length; i++) {
                  console.log(Price)
                  Price += Number(ret[i].Price)
              }
          }
      }
  } else {

      var ret = await mysql.queryTeacherEvaluationByEmal(Emal)
      if (ret == false) {
          Evaluation = "暂无评价"
      } else {
          for (var i = 0; i < ret.length; i++) {
              var date = new Date(ret[i].Ttime);
              var datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              Evaluation += `
              <div>
              <p class='t-tit'>
             ${ret[i].Tmsg} 
              </p>
                  <div class='t-rigth'>来自老师${ret[i].TeacherName}的评价 
                  <br>
                  评价时间:<strong>${datetime}</strong></div>
               </div>
              `

          }
      }
  }

  res.render(views_path + 'personal.art', {
      data: {
          money: mem,
          UserName: oAName,
          UserEmal: oAEmail,
          UserSex: oAsex,
          Userskype: oAskype,
          aif: Str,
          isTeacher: isTeacher,
          Evaluation: Evaluation,
          Price: Price
      }
  })
}

/**
 * @ 个人资料页面
 */
route.get('/perdata',(req,res)=>{
  var mem
  console.log(req.signedCookies.malli)
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
                              ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, true)
                          }, function (err) {
                              var Str = "暂无预约信息!"
                              ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, true)
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
                      ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, false)

                  }, function (err) {
                      var Str = "暂无预约信息!"
                      ProfileRendering(res, req.signedCookies.malli, mem, data[0].oAName, data[0].oAEmail, data[0].oAsex, data[0].oAskype, Str, false)
                  })


          }
      })

  })
})





module.exports = route