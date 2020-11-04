const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mysql = require('../msOp')
const Tool = require('../Toos')
const sendemal = require('../helpers/sendEmal')
router.use(cookieParser("wcasd2398123asd12aasd"))
const model_inf = require('../models/Userinformation')
const model_Appint = require('../models/Appointment')
const model_Ainfor = require('../models/tAinformation')
const model_UserT = require('../models/UserT')
const model_UserP = require('../models/UserP')

router.post('/dataUpload', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.redirect('/logoin.html')
        return;
    }
    var Userdata = '';
    req.on('data', function (data) {
        Userdata += data;
    })
    req.on('end', function () {
        try {
            Userdata = JSON.parse(Userdata)
        } catch (e) {
            res.send({
                stats: 0,
                msg: '数据异常',
                error: e
            });
            return
        }
        if (Userdata.kouzuofanhao == undefined) {
            Userdata.kouzuofanhao = ''
        }
        if (Userdata.renID == undefined) {
            Userdata.renID = ''
        }
        if (Userdata.telID == undefined) {
            Userdata.telID = ''
        }
        if (Userdata.kouzuomin == undefined) {
            Userdata.kouzuomin = ''
        }

        Userdata.terData2 = Userdata.terData2.replace(/'/g, "&#145;")
        Userdata.terData = Userdata.terData.replace(/'/g, "&#145;")
        Userdata.SkypeID = Userdata.SkypeID.replace(/'/g, "&#145;")

        mysql.updateUserProfilebyemal(req.signedCookies.malli,
            Userdata.Name,
            Userdata.NameID,
            Userdata.EngID,
            Userdata.JanpenName,
            Userdata.BlankID,
            Userdata.School,
            Userdata.Home,
            Userdata.yearHome,
            Userdata.SkypeID,
            Userdata.WeixinID,
            Userdata.yearData,
            Userdata.Sex,
            Userdata.Phpne,
            Userdata.Lesson,
            Userdata.treHeader,
            Userdata.terData,
            Userdata.terData2,
            Userdata.moeny1,
            Userdata.moeny2,
            Userdata.Blanknum,
            Userdata.Blanktit,
            Userdata.xianzaizhiye,
            Userdata.chushengdi,
            Userdata.kouzuofanhao,
            Userdata.renID,
            Userdata.telID,
            Userdata.kouzuomin,
            function (data, err) {
                if (err) {
                    res.send({
                        stats: 0,
                        msg: '数据更新失败',
                        error: err
                    });
                    return
                }
                res.send({
                    stats: 1,
                    msg: '资料更新成功!'
                });
            })
    })
})
router.get('/userinfo', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "Cookies校验失败!,请跳转到登录页"
        })
        return;
    }
    mysql.queryUserinformbyEmal(req.signedCookies.malli, function (data, err) {
        if (err || data.length == 0) {
            res.send({
                status: 0,
                msg: "Cookies校验失败!,请跳转到登录页"
            })
            return;
        }
        res.send(data[0])
    })
})
router.get('/isfirst', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "Cookies校验失败!,请跳转到登录页"

        })
        return;
    }
    mysql.queryUserinformbyEmal(req.signedCookies.malli, function (data, err) {
        if (err || data.length == 0) {
            res.send({
                status: 0,
                msg: "Cookies校验失败!,请跳转到登录页"

            })
            return;
        }
        if (data[0].isfirst == null || Number(data[0].isfirst) == 0) {
            res.send({
                status: 0,
                msg: "首次登录资料未提交"
            })
        } else {
            res.send({
                status: 1,
                msg: "资料已提交"
            })
        }


    })
})


//上传修改课程信息
router.post('/setData', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.status(302)
        res.end()
        return;
    }
    var Userdata = '';
    req.on('data', function (data) {
        Userdata += data;
    })
    req.on('end', function () {
        try {
            Userdata = JSON.parse(Userdata)
        } catch (e) {
            res.send({
                status: 1,
                error: e
            })
            return
        }
        mysql.queryUserTIDbyemal(req.signedCookies.malli, function (data, err) {
            if (err || data == []) {
                res.send({
                    status: 1,
                    error: err,
                    data: data
                })
                return
            }
            var temp = data[0]
            mysql.queryTimedatabyID(data[0].ID, Userdata.time, function (data, err) {
                if (err) {
                    res.send({
                        status: 1,
                        error: err,
                        data: data
                    })
                    return
                }

                if (data.length == 0) {
                    mysql.CreatIDbydatatime(temp.ID, temp.oAEmail, Userdata.time, Userdata.status, function (data, err) {
                        if (err) {
                            res.send({
                                status: 1,
                                error: err
                            })
                            return
                        }
                        res.send({ status: 0 })
                    })
                } else {
                    mysql.updeteIDbystatus(temp.ID, Userdata.status, Userdata.time, function (data, err) {
                        if (err) {
                            res.send({
                                status: 1,
                                error: err
                            })
                            return
                        }
                        res.send({ status: 0 })
                    })
                }

            })

        })
    })
})

function readJsondata(req) {
    return new Promise(function (resolve, reject) {
        var UserData = ''
        req.on('data', function (param) {
            UserData += param
        })
        req.on('end', function () {
            try {
                var data = JSON.parse(UserData)
            } catch (e) {
                console.log("file:msOp.js function:readJsondata " + e)
                reject(null)
            }
            resolve(data)
        })
    })
}
router.post('/makeAnapp', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 4,
            msg: "用户未登录"
        })
        return;
    }
    var UserData;
    var isSpecialOffer = false
    readJsondata(req)
        .then(function (data) {
            UserData = data
            return mysql.queryIDbyEmalUset(UserData.ID)

        }, function (err) {
            res.send({
                status: 1,
                error: err,
                msg: "数据错误"
            })
        })
        //是否享受特价
        .then(function (data) {
            if (data == null) {
                res.send({
                    status: 1,
                    error: err,
                    msg: "数据错误"
                })
            } else {
                UserData.Email = data.oAEmail
                UserData.Name = data.oAName
                UserData.ID = data.ID
            }

            return model_Appint.queryAppointment_isSpecialOffer_Byemail(UserData.Email, req.signedCookies.malli)
        }, function (err) {
            res.end({
                status: 1,
                error: err,
                msg: "服务器错误"
            })
            return
        })
        .then(function (data) {
            if (data == null) {
                isSpecialOffer = true
            }
            return mysql.queryCurriculumPrice(UserData.Email, isSpecialOffer)
        }, function (err) {
            res.send({
                status: 1,
                error: err,
                msg: "数据错误"
            })
        })
        .then(function (data) {

            if (data == null) {
                res.send({
                    status: 3,
                    msg: "未找到该老师相关信息或老师资料未填写!"
                })
            } else {
                UserData.moeny = data
                UserData.msg = '成功!'
                UserData.isSpecialOffer = isSpecialOffer
                UserData.status = 0
                res.send(UserData)
            }

        }, function (err) {
            res.send({
                status: 1,
                error: err,
                msg: "数据错误"
            })
        })
})

router.post('/pay', function (req, res) {

    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 4,
            msg: "用户未登录"
        })
        return;
    }
    var pUserdata = {};
    var tUserdata = {};
    var isSpecialOffer = false
    var sign = false
    readJsondata(req)
        .then(function (data) {           //处理客户端发送来的数据
            if (data == null) {
                res.send({ status: 10, msg: "参数错误!" })
                return new Promise(() => { });
            }
            tUserdata = data
            return mysql.queryEmalbymoney(req.signedCookies.malli)
        })
        .then(function (data) {           //查询用户积分余额情况 
            if (data == null) {
                res.send({
                    status: 2,
                    msg: "积分余额不足,请充值!"
                })
                return new Promise(() => { });
            } else {
                pUserdata.UserID = data.UserID
                pUserdata.UserEmal = data.UserEmal
                pUserdata.integral = data.integral
                return mysql.queryIDbyEmalUset(tUserdata.ID)
            }
        })
        .then(function (data) {         //通过老师ID查询老师Emal
            tUserdata.Email = data.oAEmail
            return model_Appint.queryAppointment_isSpecialOffer_Byemail(tUserdata.Email, req.signedCookies.malli)
        })
        .then(function (data) {        //判断用户查询用户历史预约信息,用来判断是否首次预约 
            if (data == null) {
                isSpecialOffer = true
            }
            return mysql.queryCurriculumPrice(tUserdata.Email, isSpecialOffer)
        })
        .then(function (data) {        //查询老师课程预约价格
            tUserdata.moeny = data
            if (pUserdata.integral < tUserdata.moeny) {
                res.send({
                    status: 2,
                    msg: "积分余额不足,请充值!"
                })
                return new Promise(() => { })
            } else {

                return mysql.queryUserinformbyEmalPromise(tUserdata.Email)
            }

        })
        .then(function (data) {        //查询老师信息
            tUserdata.Name = data.Name
            tUserdata.Phpne = data.Phpne
            tUserdata.SkypeID = data.SkypeID
            tUserdata.WeixinID = data.WeixinID
            return mysql.queryUserPbyEmalPromise(pUserdata.UserEmal)
        })
        .then(function (data) {
            if (data == null) {
                res.send({
                    status: 5,
                    msg: "未找到自身用户资料,如果您登录的是老师账号,请更换普通用户账号后再来预约!"
                })
                return new Promise(() => { });
            } else {
                pUserdata.UserID = data.ID
                pUserdata.oAName = data.oAName
                pUserdata.oAPaonee = data.oAPaonee
                pUserdata.oAskype = data.oAskype
                return Tool.UpdatePoints(-Number(tUserdata.moeny), pUserdata.UserEmal, pUserdata.UserID)
            }
        })
        .then(function (data) {
            if (data == false) {
                res.send({
                    status: 6,
                    msg: "付款失败，异常错误!如果误扣款,请联系网站管理员!"
                })
                return new Promise(() => { });
            } else {
                var Grend = 0
                async function all() {
                    Grend = await model_inf.appraisal_authority(tUserdata.Email)
                    if (Grend > 4 || Grend == 0) {
                        Grend = 1
                    }
                    tUserdata.RMB = 0
                    tUserdata.Yen = 0
                    switch (Grend) {
                        case 1:
                            tUserdata.RMB = 10
                            tUserdata.Yen = 150
                            break
                        case 2:
                            if (isSpecialOffer) {
                                tUserdata.Yen = 150
                                tUserdata.RMB = 10
                            } else {
                                tUserdata.Yen = 450
                                tUserdata.RMB = 25
                            }
                            break
                        case 3:
                            tUserdata.RMB = Number(tUserdata.moeny) * 0.06
                            tUserdata.Yen = Number(tUserdata.moeny) * 0.6
                            tUserdata.RMB = tUserdata.RMB * 0.6

                            tUserdata.Yen = tUserdata.Yen.toFixed(0)
                            tUserdata.RMB = tUserdata.RMB.toFixed(0)
                            break
                    }
                    return mysql.creatAppointmentinformation(tUserdata, pUserdata)
                }
                return all()
            }
        })
        .then(function (data) {
            if (data != undefined) {
                return mysql.modifyMakeanappointment(tUserdata.ID, tUserdata.Email, tUserdata.Time, 3)
            } else {
                Tool.UpdatePoints(Number(tUserdata.moeny), pUserdata.UserEmal, pUserdata.UserID)
                res.send({
                    status: 12,
                    msg: "预约失败!该时间段已经被别人抢先预约啦!"
                })
                return new Promise(() => { });
            }
        })
        .then(function (data) {
            if (data != undefined) {
                sendemal.sendEmalTeacher(pUserdata.UserEmal, pUserdata.oAName, tUserdata.Name, tUserdata.Time, false)
                sendemal.sendEmalTeacher(tUserdata.Email, tUserdata.Name, pUserdata.oAName, tUserdata.Time, true)
                res.send({
                    status: 0,
                    msg: "预约成功,请稍后在个人资料预约界面查看老师联系方式."
                })
            } else {
                Tool.UpdatePoints(Number(tUserdata.moeny), pUserdata.UserEmal, pUserdata.UserID)
                res.send({
                    status: 12,
                    msg: "预约失败!请确认老师是否开放预约时间!"
                })
                return new Promise(() => { });
            }
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            console.log("flie:msOp.js router:/pay error:" + err)
            res.send({
                status: 244,
                msg: "未知错误!"
            })
            return
        });



})

router.post('/cancel', function (req, res) {
    async function cancel(malli, Time, id) {
        ret = await model_inf.appraisal_authority(malli)
        if (ret == null) {
            var ret = await model_UserT.query_usert_Emal_byID(id)
            if (!ret) {
                res.send({ status: 4, msg: "老师信息异常!" })
                return
            }
            console.log(ret.oAEmail)
            ret = await model_Appint.queryAppointment_alldata_Byemail(ret.oAEmail, malli, Time)
            if (ret == false) {
                res.send({ status: 1, msg: "暂无预约信息!" })
                return
            } else {
                var data = ret
                ret = await model_Appint.deleteAppointment_alldata_BytimeApp(Time, malli, data.TeacherEmal)
                if (ret) {
                    res.send({ status: 2, msg: "キャンセルしました。" })
                    //恢复预约信息
                    model_Ainfor.modify_Makeanappointment(data.TeacherEmal, data.timeApp, 1)
                    Tool.aUpdatePoints(Number(data.Price), data.UserEmal, data.UserID)
                } else {
                    res.send({ status: 1, msg: "暂无预约信息!" })
                    return
                }
            }
        } else {
            res.send({ status: 0, msg: "用户权限不足!" })
            return
        }
    }
    readJsondata(req)
        .then(function (data) {
            if (data) {
                if (data.Time == undefined || data.id == undefined) {
                    res.send({ status: 0, msg: "错误" })
                    return
                }
                var date = new Date(Tool.getCurrentTime(9))
                date.setHours(date.getHours() - 3)
                var current_date = new Date(date)
                current_date = current_date.getTime(current_date)

                var Time = new Date(data.Time)
                Time = Time.getTime(Time)

                if (Time > current_date) {
                    cancel(req.signedCookies.malli, data.Time, data.id)
                } else {
                    res.send({ status: 3, msg: "请在课前两个小时之前取消预约，超时不能再取消预约!" })
                    return
                }
            }
        }, function (err) {
            res.send({ status: 0, msg: "错误" })
            return
        })

})

router.post('/studentEvaluation', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "用户信息错误"
        })
        return;
    }
    var UserData;

    readJsondata(req)
        .then(function (data) {
            UserData = data
            console.log(data)

            if (data.Time == '' || data.Time == undefined || data.Time == null || data.text == '' || data.text == undefined || data.text == null) {
                res.send({
                    status: 0,
                    msg: "数据异常"
                })
                return new Promise(() => { })
            } else {
                var timestamp1 = new Date(data.Time)
                var min = timestamp1.getMinutes()
                timestamp1.setMinutes(min + 25);
                timestamp1 = Date.parse(timestamp1)
                timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳

                var timestamp2 = Date.parse(Tool.getCurrentTime(9))
                timestamp2 = timestamp2 / 1000

                if (timestamp2 < timestamp1) {
                    res.send({
                        status: 1,
                        msg: "请耐心等待老师上完课之后再来评价老师哦!"
                    })
                    return new Promise(() => { })
                }
                return mysql.queryMsgBytime(UserData.Time)
            }
        })
        .then(function (data) {
            if (data.Pstatus == 1) {
                res.send({
                    status: 164,
                    msg: "该条信息学生已经评价过了!"
                })
                return new Promise(() => { })
            } else {
                return mysql.setMsgBytime(UserData.Time, UserData.text)
            }

        })
        .then(function (data) {
            console.log(data)
            if (data == 0) {
                res.send({
                    status: 1,
                    msg: "评价成功!"
                })
            }
        })
        .catch(function (err) {
            res.send({
                status: 0,
                error: err,
                msg: "数据错误"
            })
        })
})

router.post('/getstudentEvaluation', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "用户信息错误"
        })
        return;
    }
    var UserData;
    readJsondata(req)
        .then(function (data) {
            UserData = data
            console.log(data)
            if (data.Time == '' || data.Time == undefined || data.Time == null) {
                res.send({
                    status: 0,
                    msg: "数据异常"
                })
                return new Promise(() => { })
            } else {
                return mysql.queryMsgBytime(UserData.Time)
            }
        })
        .then(function (data) {
            if (data.Pstatus != 1) {
                res.send({
                    status: 0,
                    msg: "该条信息未评价!"
                })
                return new Promise(() => { })
            } else {
                return mysql.getMsgBytime(UserData.Time)
            }
        })
        .then(function (data) {
            res.send({
                status: 1,
                msg: data.Pmsg
            })
        })
        .catch(function (err) {
            res.send({
                status: 0,
                error: err,
                msg: "数据错误"
            })
        })
})

router.post('/teacherEvaluation', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "用户信息错误"
        })
        return;
    }
    var UserData;

    readJsondata(req)
        .then(function (data) {
            UserData = data
            console.log(UserData)
            if (data.Time == '' || data.Time == null || data.Time == undefined) {
                res.send({
                    status: 0,
                    msg: "数据异常"
                })
                return new Promise(() => { })
            } else {
                var timestamp1 = new Date(data.Time)
                var min = timestamp1.getMinutes()
                timestamp1.setMinutes(min + 25);
                timestamp1 = Date.parse(timestamp1)
                timestamp1 = timestamp1 / 1000; //25分钟之后的时间戳

                var timestamp2 = Date.parse(Tool.getCurrentTime(9))
                timestamp2 = timestamp2 / 1000

                if (timestamp2 < timestamp1) {
                    res.send({
                        status: 1,
                        msg: "请给学生上完课之后再来评价学生哦!"
                    })
                    return new Promise(() => { })
                }
                return mysql.queryMsgBytime(UserData.Time)
            }
        })
        .then(function (data) {
            UserData.Price = data.Price
            UserData.TeacherID = data.TeacherID
            UserData.TeacherEmal = data.TeacherEmal
            if (data.Tstatus == 1) {
                res.send({
                    status: 3,
                    msg: "该老师已经评价过,并且积分已经增加",
                    Evaluation: data.Tmsg
                })
                return new Promise(() => { })
            } else {
                return mysql.setTMsgBytime(UserData.Time, UserData.Text, UserData.classhour, UserData.TeacherEmal, UserData.Text2)
            }

        })
        .then(function (data) {
            if (data == 0) {
                if (Number(UserData.classhour) == 25) {
                    return mysql.setTstatusBytime(UserData.Time)
                }
                else {
                    res.send({
                        status: 1,
                        msg: "评价成功"
                    })
                    return new Promise(() => { })
                }
            }
        })
        .then(function (data) {
            if (data == 0) {
                return Tool.UpdatePoints(Number(UserData.Price), UserData.TeacherEmal, UserData.TeacherID)
            }
        })
        .then(function (data) {
            if (data) {
                res.send({
                    status: 1,
                    msg: "评价成功"
                })
                return new Promise(() => { })
            }

        })
        .catch(function (err) {
            res.send({
                status: 0,
                msg: "数据异常"
            })
        })
})

router.post('/geteacherEvaluation', function (req, res) {
    if (req.signedCookies.malli == undefined || req.signedCookies.malli == '') {
        res.send({
            status: 0,
            msg: "用户信息错误"
        })
        return;
    }
    var UserData;
    async function geteacherEvaluation(emalli, UserData) {
        var data = await model_Ainfor.query_MsgBytime(UserData.Time, emalli)
        UserData.Price = data.Price
        UserData.TeacherID = data.TeacherID
        UserData.TeacherEmal = data.TeacherEmal
        if (data.Tstatus == 1) {
            res.send({
                status: 3,
                msg: "该老师已经评价过,并且积分已经增加",
                Evaluation: data.Tmsg,
                onEvaluation: data.Text2
            })
            return
        } else {
            res.send({
                status: 1,
                msg: "该老师未评价过",
            })
            return
        }
    }
    readJsondata(req)
        .then(function (data) {
            UserData = data
            console.log(UserData)
            if (data.Time == '' || data.Time == null || data.Time == undefined) {
                res.send({
                    status: 0,
                    msg: "数据异常"
                })
                return new Promise(() => { })
            } else {
                geteacherEvaluation(req.signedCookies.malli, UserData)
                return new Promise(() => { })
            }
        })
        .catch(function (err) {
            res.send({
                status: 0,
                msg: "数据异常"
            })
        })


})

router.post('/getStudentreviews', function (req, res) {
    async function getStudentreviews(malli, id) {
        console.log(id)
        ret = await model_inf.appraisal_authority(malli)
        if (ret != 404 && ret != null) {
            var ret = await model_UserP.query_userp_Emal_byID(id)
            if (!ret) {
                res.send({ status: 4, msg: "老师信息异常!" })
                return
            }
            ret = await model_Appint.queryAppointment_Pmsg_Byemail(malli, ret.oAEmail, id)
            res.send(ret)
        } else {
            res.send({ status: 0, msg: "用户权限不足!" })
            return
        }
    }
    readJsondata(req)
        .then(function (data) {
            if (data) {
                if (data.id == undefined) {
                    res.send({ status: 0, msg: "错误" })
                    return
                }
                getStudentreviews(req.signedCookies.malli, data.id)
            }
        }, function (err) {
            res.send({ status: 0, msg: "错误" })
            return
        })
})

router.post('/getprivateEvaluation', function (req, res) {
    async function getprivateEvaluation(ID) {
        var ret = await model_UserP.query_userp_Emal_byID(ID)
        if (ret) {
            var ret = await model_Appint.queryAppointment_alldata_ByUserEmal(ret.oAEmail)

            res.send(ret)
        } else {
            res.send({
                status: 0,
                msg: "数据异常"
            })
            return
        }
    }
    readJsondata(req)
        .then(function (data) {
            getprivateEvaluation(data.ID)
        })
})


router.get('/getime', function (req, res) {

    res.send({ Time: Tool.getCurrentTime(9) })
})

//获取课程凭证信息
router.post('/GetVoucher', function (req, res) {
    async function GetVoucher(req, res, data) {
        if (model_inf.appraisal_authority(req.signedCookies.malli) != 404) {
            var ret = await model_Appint.queryAppointment_SingleData_Byemail(data.Time, data.ID, req.signedCookies.malli)
            if (ret) {
                res.send({status:0,data:ret,msg:"ok"})
            }else
            {
                res.send({status:1,data:null,msg:"no data"})
            }
        }else
            {
                res.send({status:1,data:null,msg:"no data"})
            }
    }

    readJsondata(req)
        .then(function (data) {
            GetVoucher(req,res,data)
        })
})
module.exports = router

