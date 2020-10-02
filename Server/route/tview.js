const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mysql = require('../msOp')
var bodyParser = require('body-parser');//解析,用req.body获取post参数
const { json } = require('express')
const port = require('./port')
const url = require('url')
const { route } = require('./alipay_route')
const { template } = require('express-art-template')


const path = require('path')



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
    origin: port.port
}

router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "cookie,Content-type");
    //接收ajax请求手动提交的cookie信息
    res.header("Access-Control-Allow-Credentials", true);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
});
router.use(cookieParser("wcasd2398123asd12aasd"))
router.use(cors(corsOptions))




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

function getNextDate(date, day) {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
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
        console.log(err)
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
            var temp = template(path.join(__dirname, "../views/Ttable.art"), {
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


            var temp = template(path.join(__dirname, "../views/Ttable.art"), {
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
    if (isTeacher) {
        var ret = await mysql.queryStudentEvaluationByEmal(Emal)
        if (ret == false) {
            Evaluation = "暂无评价"
        } else {

            for (var i = 0; i < ret.length; i++) {
                Evaluation += `
                <div>
                <p class='t-tit'>
                ${ret[i].Pmsg} 
                </p>
                    <div class='t-rigth'>对${ret[i].UserName}学生的评价 
                    <br>
                    评价时间:<strong>2020-10-1</strong></div>
                 </div>
                `


            }
        }
    } else {
        var ret = await mysql.queryTeacherEvaluationByEmal(Emal)
        if (ret == false) {
            Evaluation = "暂无评价"
        } else {
            for (var i = 0; i < ret.length; i++) {
                Evaluation += `
                <div>
                <p class='t-tit'>
               ${ret[i].Tmsg} 
                </p>
                    <div class='t-rigth'>对${ret[i].TeacherName}老师的评价 
                    <br>
                    评价时间:<strong>2020-10-1</strong></div>
                 </div>
                `

            }
        }
    }

    console.log(ret)
    res.render('personal.art', {
        data: {
            money: mem,
            UserName: oAName,
            UserEmal: oAEmail,
            UserSex: oAsex,
            Userskype: oAskype,
            aif: Str,
            isTeacher: isTeacher,
            Evaluation: Evaluation
        }
    })
}

router.get('/personal.html', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '' || req.signedCookies.malli == null) {
        res.redirect('/')
        return
    }
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
                                    Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].UserName + '</td><td class="TeacherWeChatID">' + datas[i].UserWeChat + '</td><td class="TeacherSkypeID">' + datas[i].UserSkypeID + '</td><td> <button type="button" class="layui-btn Studtit">评价</button></td></tr>'
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

                            Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].TeacherName + '</td><td class="TeacherWeChatID">' + datas[i].TeacherWeChat + '</td><td class="TeacherSkypeID">' + datas[i].TeacherSkypeID + '</td><td class="button-user"> <button type="button" class="layui-btn Teachertit">评价</button></td></tr>'

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



router.get('/text.html', function (req, res) {
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    res.render('text.art', { data: { Timp: RenderTable(req.query.yyyy, req.query.mm, req.query.dd) } })
})


router.get('/ter.html', function (req, res) {
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    if (req.query.id == undefined) {
        res.redirect('/')
        return
    }
    mysql.queryIDbyEmal(Number(req.query.id)) //查询邮箱
        .then(function (data) {
            return mysql.queryEmalbyID(data.Email)
        }, function (err) {
            res.redirect('/')
        })//查询UserT里的ID
        .then(function (data) {
            var ID = data.ID
            mysql.queryUserTInfoByID(Number(req.query.id), function (data, err) {
                if (err || data == []) {
                    res.redirect('/')
                    return
                }
                try {
                    var lit = data[0].Lesson.split(',')
                } catch (e) {
                    res.redirect('/')
                    return
                }

                for (var i = 0; i < lit.length; i++) {
                    switch (Number(lit[i])) {
                        case 1:
                            lit[i] = '中文'
                            break
                        case 2:
                            lit[i] = '日文'
                            break
                        case 3:
                            lit[i] = '英文'
                            break
                        case 4:
                            lit[i] = '韩文'
                            break
                    }
                }
                data[0].Lesson = lit
                var list = data
                URenderTable(ID, req.query.id, data[0].Email, req.query.yyyy, req.query.mm, req.query.dd, function (data) {
                    res.render('ter.art', { data: list[0], html: data })
                })
            })
        }, function (err) {
            res.redirect('/')
        })




})
router.get('/teacherdata.html', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.redirect('/logoin.html')
        return;
    }
    async function index(Emal) {
        return await mysql.isTeacher(Emal)
    }
    index(req.signedCookies.malli)
        .then((data) => {
            if (!data) {
                res.redirect('/')
                return
            }
        })
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    TRenderTable(req.signedCookies.malli, req.query.yyyy, req.query.mm, req.query.dd, function (data) {
        res.render('teacherdata.art', { data: { Timp: data } })
    })
})



router.get('/ja_JP/ter.html', function (req, res) {
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    if (req.query.id == undefined) {
        res.redirect('/')
        return
    }
    mysql.queryIDbyEmal(Number(req.query.id)) //查询邮箱
        .then(function (data) {
            return mysql.queryEmalbyID(data.Email)
        }, function (err) {
            res.redirect('/')
        })//查询UserT里的ID
        .then(function (data) {
            var ID = data.ID
            mysql.queryUserTInfoByID(Number(req.query.id), function (data, err) {
                if (err || data == []) {
                    res.redirect('/')
                    return
                }
                try {
                    var lit = data[0].Lesson.split(',')
                } catch (e) {
                    res.redirect('/')
                    return
                }

                for (var i = 0; i < lit.length; i++) {
                    switch (Number(lit[i])) {
                        case 1:
                            lit[i] = '中文'
                            break
                        case 2:
                            lit[i] = '日文'
                            break
                        case 3:
                            lit[i] = '英文'
                            break
                        case 4:
                            lit[i] = '韩文'
                            break
                    }
                }
                data[0].Lesson = lit
                var list = data
                URenderTable(ID, req.query.id, data[0].Email, req.query.yyyy, req.query.mm, req.query.dd, function (data) {
                    res.render('ja_JP_ter.art', { data: list[0], html: data })
                })
            })
        }, function (err) {
            res.redirect('/')
        })




})

router.get('/ja_JP/personal.html', function (req, res) {
    if (req.signedCookies.malli == undefined) {
        res.redirect('./logoin.html')
        return
    }
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
                        res.redirect('./logoin.html')
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
                                        datas[i].UserWeChat = "なし"
                                    }
                                    Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].UserName + '</td><td class="TeacherWeChatID">' + datas[i].UserWeChat + '</td><td class="TeacherSkypeID">' + datas[i].UserSkypeID + '</td><td> <button type="button" class="layui-btn Studtit">評価</button></td></tr>'
                                }

                                res.render('ja_JP_personal.art', {
                                    data: {
                                        money: mem,
                                        UserName: data[0].oAName,
                                        UserEmal: data[0].oAEmail,
                                        UserSex: data[0].oAsex,
                                        Userskype: data[0].oAskype,
                                        aif: Str,
                                        isTeacher: true
                                    }

                                })

                            }, function (err) {
                                var Str = "予約情報はまだありません"
                                res.render('ja_JP_personal.art', {
                                    data: {
                                        money: mem,
                                        UserName: data[0].oAName,
                                        UserEmal: data[0].oAEmail,
                                        UserSex: data[0].oAsex,
                                        Userskype: data[0].oAskype,
                                        aif: Str,
                                        isTeacher: true
                                    }

                                })
                            })


                    }

                })

            } else {
                mysql.seleteAppointment(req.signedCookies.malli)
                    .then(function (datas) {
                        var Str = ''
                        for (var i = datas.length - 1; i >= 0; i--) {
                            Str += '<tr><td class="timeApp">' + datas[i].timeApp + '</td><td class="TeacherName">' + datas[i].TeacherName + '</td><td class="TeacherWeChatID">' + datas[i].TeacherWeChat + '</td><td class="TeacherSkypeID">' + datas[i].TeacherSkypeID + '</td><td class="button-user"> <button type="button" class="layui-btn Teachertit">評価</button></td></tr>'
                        }
                        res.render('ja_JP_personal.art', {
                            data: {
                                money: mem,
                                UserName: data[0].oAName,
                                UserEmal: data[0].oAEmail,
                                UserSex: data[0].oAsex,
                                Userskype: data[0].oAskype,
                                aif: Str,
                                isTeacher: false
                            }

                        })

                    }, function (err) {
                        var Str = "予約情報はまだありません"
                        res.render('ja_JP_personal.art', {
                            data: {
                                money: mem,
                                UserName: data[0].oAName,
                                UserEmal: data[0].oAEmail,
                                UserSex: data[0].oAsex,
                                Userskype: data[0].oAskype,
                                aif: Str,
                                isTeacher: false
                            }

                        })
                    })


            }
        })

    })
})

router.get('/ja_JP/teacherdata.html', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.redirect('./logoin.html')
        return;
    }
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    TRenderTable(req.signedCookies.malli, req.query.yyyy, req.query.mm, req.query.dd, function (data) {
        res.render('ja_JP_teacherdata.art', { data: { Timp: data } })
    })
})


module.exports = router
