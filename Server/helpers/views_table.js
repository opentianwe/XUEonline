exports.getNextDate = getNextDate
exports.fun_date_to = fun_date_to
exports.Timearray = Timearray
exports.URenderTable = URenderTable
exports.TRenderTable = TRenderTable
exports.ProfileRendering = ProfileRendering
const path = require('path')
const mysql = require('../msOp')
const { template } = require('express-art-template')
const views_path = 'chinese_views/public_views/'

function getNextDate(date, day) {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
}
  
function fun_date_to(aa) {
    var date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    return {
      yyyy: date2.getFullYear(),
      mm: (date2.getMonth() + 1),
      dd: date2.getDate()
    };
}
  
  
var Timearray = [
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '00:00',
    '00:30',
  ]
  
  
function URenderTable(usertId, id, emal, yyyy, mm, dd, callback) {
    mysql.queryTimedatabyemal(emal, function (data, err) {
      if (err) {
        callback(null)
        return
      }
  
      var pet = { on: false, to: false }
      if (yyyy != undefined || mm != undefined || dd != undefined) {
        var Time = new Array()
        var dataTIme = new Array()
        var totime = fun_date_to(-1)
  
        var dTime = fun_date_to(0)
  
        var time = yyyy + "/" + mm + "/" + dd //请求的时间
        var todTime = dTime.yyyy + "/" + dTime.mm + "/" + dTime.dd //今天时间
        var tem = totime.yyyy + "/" + totime.mm + "/" + totime.dd//昨天时间
  
        var date_nix = Date.parse(time)
  
        var date_unix = Date.parse(todTime)
  
        var date1_unix = Date.parse(tem) //將字符串格式日期转化为时间戳，就是1970年到当前日期的毫秒数 
  
  
        if (date_nix < date_unix) {
          if (date_nix == date1_unix) {
            yyyy = totime.yyyy
            mm = totime.mm
            dd = totime.dd
            pet = { on: true, to: false }
          } else {
            var totimes = fun_date_to(-2)
            yyyy = totimes.yyyy
            mm = totimes.mm
            dd = totimes.dd
            pet = { on: true, to: true }
  
          }
        }
  
  
  
  
        totime = getNextDate(yyyy + "-" + mm + "-" + dd, -7)
        totime = totime.split("-")
        for (var i = 0; i < 7; i++) {
          var angData = getNextDate(yyyy + "-" + mm + "-" + dd, i).split("-")
          Time.push(angData[1] + "月" + angData[2] + "日")
          dataTIme.push({ yyyy: angData[0], mm: angData[1], dd: angData[2] })
        }
        var yymmddff = new Array()
        for (var i = 0; i < 7; i++) {
          yymmddff[i] = new Array()
          for (var s = 0; s < Timearray.length; s++) {
            var timestr = dataTIme[i].yyyy + "-" + dataTIme[i].mm + "-" + dataTIme[i].dd + "  " + Timearray[s]
            var status = 0
            for (var x = 0; x < data.length; x++) {
              if (data[x].timeop == timestr) {
                status = data[x].status
              }
            }
            if (status != 2) {
  
              var timestamp1 = new Date(timestr)
              var timestamp2 = new Date()
              var min = timestamp2.getMinutes()
              timestamp2.setMinutes(min + 30)
              timestamp2 = Date.parse(timestamp2)
              timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳
              timestamp2 = timestamp2 / 1000
  
  
              if (timestamp2 >= timestamp1) {
                status = 5
              }
            }
            yymmddff[i][s] = { ID: usertId, time: timestr, status: status }
          }
        }
  
        var temp = template(path.join(__dirname, "../views/Utable.art"), {
          data: {
            Time: Time,
            dataTime: dataTIme,
            totime: { yyyy: totime[0], mm: totime[1], dd: totime[2] },
            pet: pet,
            yymmddff: yymmddff,
            ID: id,
            usertId: usertId
          }
        })
        callback(temp)
      } else {
        var Time = new Array()
        var dataTIme = new Array()
        var dTime = fun_date_to(0)
        for (var i = 0; i < 7; i++) {
          var angData = getNextDate(dTime.yyyy + "-" + dTime.mm + "-" + dTime.dd, i).split("-")
          Time.push(angData[1] + "月" + angData[2] + "日")
          dataTIme.push({ yyyy: angData[0], mm: angData[1], dd: angData[2] })
        }
        var yymmddff = new Array()
        for (var i = 0; i < 7; i++) {
          yymmddff[i] = new Array()
          for (var s = 0; s < Timearray.length; s++) {
            var timestr = dataTIme[i].yyyy + "-" + dataTIme[i].mm + "-" + dataTIme[i].dd + "  " + Timearray[s]
            var status = 0
            for (var x = 0; x < data.length; x++) {
              if (data[x].timeop == timestr) {
                status = data[x].status
              }
            }
            if (status != 2) {
  
              var timestamp1 = new Date(timestr)
              var timestamp2 = new Date()
              var min = timestamp2.getMinutes()
              timestamp2.setMinutes(min + 30)
              timestamp2 = Date.parse(timestamp2)
              timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳
              timestamp2 = timestamp2 / 1000
  
  
              if (timestamp2 >= timestamp1) {
                status = 5
              }
            }
            yymmddff[i][s] = { ID: usertId, time: timestr, status: status }
          }
        }
  
        var totime = getNextDate(dataTIme[0].yyyy + "-" + dataTIme[0].mm + "-" + dataTIme[0].dd, -2)
        totime = totime.split("-")
  
  
        var temp = template(path.join(__dirname, "../views/Utable.art"), {
          data: {
            Time: Time,
            dataTime: dataTIme,
            totime: { yyyy: totime[0], mm: totime[1], dd: totime[2] },
            pet: pet,
            yymmddff: yymmddff,
            ID: id,
            usertId: usertId
          }
        })
        callback(temp)
      }
  
    })
  }
  
  
function TRenderTable(emal, yyyy, mm, dd, callback) {
    mysql.queryTimedatabyemal(emal, function (data, err) {
      if (err) {
        callback(null)
        return
      }
      var pet = { on: false, to: false }
  
      if (yyyy != undefined || mm != undefined || dd != undefined) {
        var Time = new Array()
        var dataTIme = new Array()
        var totime = fun_date_to(0)
  
        var date1 = yyyy + "/" + mm + "/" + dd
        var date2 = totime.yyyy + "/" + totime.mm + "/" + totime.dd //字符串日期
  
        var date1_unix = Date.parse(date1) //將字符串格式日期转化为时间戳，就是1970年到当前日期的毫秒数 
        var date2_unix = Date.parse(date2) //將字符串格式日期转化为时间戳，就是1970年到当前日期的毫秒数
  
        if (date1_unix <= date2_unix) {
          yyyy = totime.yyyy
          mm = totime.mm
          dd = totime.dd
        }
  
        totime = getNextDate(yyyy + "-" + mm + "-" + dd, -7)
        totime = totime.split("-")
        for (var i = 0; i < 7; i++) {
          var angData = getNextDate(yyyy + "-" + mm + "-" + dd, i).split("-")
          Time.push(angData[1] + "月" + angData[2] + "日")
          dataTIme.push({ yyyy: angData[0], mm: angData[1], dd: angData[2] })
        }
        var yymmddff = new Array()
        for (var i = 0; i < 7; i++) {
          yymmddff[i] = new Array()
          for (var s = 0; s < Timearray.length; s++) {
            var timestr = dataTIme[i].yyyy + "-" + dataTIme[i].mm + "-" + dataTIme[i].dd + "  " + Timearray[s]
            var status = 0
            for (var x = 0; x < data.length; x++) {
              if (data[x].timeop == timestr) {
                status = data[x].status
                break
              }
            }
  
            var timestamp1 = new Date(timestr)
            var timestamp2 = new Date()
            var min = timestamp2.getMinutes()
            timestamp2.setMinutes(min + 30)
            timestamp2 = Date.parse(timestamp2)
            timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳
            timestamp2 = timestamp2 / 1000
  
  
            if (timestamp2 >= timestamp1) {
              status = 5
            }
            yymmddff[i][s] = { time: timestr, status: status }
          }
        }
        var temp = template(path.join(__dirname + "../../views/chinese_views/public_components/Ttable.art"), {
          data: {
            Time: Time,
            dataTime: dataTIme,
            totime: { yyyy: totime[0], mm: totime[1], dd: totime[2] },
            pet: pet,
            yymmddff: yymmddff
          }
        })
        callback(temp)
      } else {
        var Time = new Array()
        var dataTIme = new Array()
        var dTime = fun_date_to(0)
        for (var i = 0; i < 7; i++) {
          var angData = getNextDate(dTime.yyyy + "-" + dTime.mm + "-" + dTime.dd, i).split("-")
          Time.push(angData[1] + "月" + angData[2] + "日")
          dataTIme.push({ yyyy: angData[0], mm: angData[1], dd: angData[2] })
        }
        var yymmddff = new Array()
        for (var i = 0; i < 7; i++) {
          yymmddff[i] = new Array()
          for (var s = 0; s < Timearray.length; s++) {
            var timestr = dataTIme[i].yyyy + "-" + dataTIme[i].mm + "-" + dataTIme[i].dd + "  " + Timearray[s]
            var status = 0
            for (var x = 0; x < data.length; x++) {
              if (data[x].timeop == timestr) {
                status = data[x].status
              }
            }
            var timestamp1 = new Date(timestr)
            var timestamp2 = new Date()
            var min = timestamp2.getMinutes()
            timestamp2.setMinutes(min + 30)
            timestamp2 = Date.parse(timestamp2)
            timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳
            timestamp2 = timestamp2 / 1000
  
  
            if (timestamp2 >= timestamp1) {
              status = 5
            }
            yymmddff[i][s] = { time: timestr, status: status }
          }
        }
  
        var totime = getNextDate(dataTIme[0].yyyy + "-" + dataTIme[0].mm + "-" + dataTIme[0].dd, -2)
        totime = totime.split("-")
  
  
        var temp = template(__dirname + "../../views/chinese_views/public_components/Ttable.art", {
          data: {
            Time: Time,
            dataTime: dataTIme,
            totime: { yyyy: totime[0], mm: totime[1], dd: totime[2] },
            pet: pet,
            yymmddff: yymmddff
          }
        })
        callback(temp)
      }
    })
  
  
  }
  
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