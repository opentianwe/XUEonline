const mysql = require("mysql")
const { Stats } = require("fs")
exports.writeUserT = writeUserT
exports.writeUserP = writeUserP
exports.queryUserPbyEmal = queryUserPbyEmal
exports.queryUserTbyEmal = queryUserTbyEmal
exports.queryUserinformbyEmal = queryUserinformbyEmal
exports.creatUserinform = creatUserinform
exports.updayeVidoUrlbyemal = updayeVidoUrlbyemal
exports.updayeImgUrlbyemal = updayeImgUrlbyemal
exports.updateUserProfilebyemal = updateUserProfilebyemal
exports.queryUserinform = queryUserinform
exports.queryCommodityInfoByID = queryCommodityInfoByID
exports.CreatOrder = CreatOrder
exports.queryEmalbyUserinform = queryEmalbyUserinform
exports.queryPointsbyemal = queryPointsbyemal
exports.queryUserNamebyname = queryUserNamebyname
exports.queryUserTInfoByID = queryUserTInfoByID
exports.queryTimedatabyID = queryTimedatabyID
exports.queryUserTIDbyemal = queryUserTIDbyemal
exports.CreatIDbydatatime = CreatIDbydatatime
exports.updeteIDbystatus = updeteIDbystatus
exports.queryTimedatabyemal = queryTimedatabyemal
exports.queryallTimedatabyID = queryallTimedatabyID
exports.QueryInvcode = QueryInvcode
exports.creatUserTinform = creatUserTinform
exports.xqueryUserTIDbyemal = xqueryUserTIDbyemal
exports.queryIDbyEmal = queryIDbyEmal
exports.queryEmalbyID = queryEmalbyID
exports.queryTimebyID = queryTimebyID
exports.queryEmalbymoney = queryEmalbymoney
exports.queryIDbyEmalUset = queryIDbyEmalUset
exports.queryEmalbyApp = queryEmalbyApp
exports.queryCurriculumPrice = queryCurriculumPrice
exports.queryUserinformbyEmalPromise = queryUserinformbyEmalPromise
exports.queryUserPbyEmalPromise = queryUserPbyEmalPromise
exports.queryPointsbyemalPromise = queryPointsbyemalPromise
exports.CreatPoint = CreatPoint
exports.nodifyPoint = nodifyPoint
exports.creatAppointmentinformation = creatAppointmentinformation
exports.modifyMakeanappointment = modifyMakeanappointment
exports.seleteAppointment = seleteAppointment
exports.seleteTAppointment = seleteTAppointment
exports.queryMsgBytime = queryMsgBytime
exports.setMsgBytime = setMsgBytime
exports.getMsgBytime = getMsgBytime
exports.queryOrderinformation = queryOrderinformation
exports.setOrderstatus = setOrderstatus
exports.CreatAppinfo = CreatAppinfo
exports.setTMsgBytime = setTMsgBytime
exports.setTstatusBytime = setTstatusBytime
exports.asyncqueryCommodityInfoByID = asyncqueryCommodityInfoByID
exports.asyncqueryUserPbyEmalPromise = asyncqueryUserPbyEmalPromise
exports.asyncqueryUserTbyEmal = asyncqueryUserTbyEmal
exports.querytAinformationByEmal = querytAinformationByEmal
exports.isTeacher = isTeacher
exports.queryStudentEvaluationByEmal = queryStudentEvaluationByEmal
exports.queryTeacherEvaluationByEmal = queryTeacherEvaluationByEmal
exports.queryTStudentEvaluationByEmal = queryTStudentEvaluationByEmal
var pool = mysql.createPool({
    host: '39.106.89.79',
    user: 'Tian',
    password: 'Tian123.',
    database: 'OfficialWebsiteData'
})
function woreData(str, callback) {
    pool.getConnection(function (err, connect) {
        if (err) {
            callback(err, [])
            return
        }
        connect.query(str, function (error, data) {
            pool.releaseConnection(connect)
            callback(data, error)
        })
    })
}
//教师注册
function writeUserT(oAName, oAEmail, oAPaonee, oAcodes, oApassword, oAhobby, oAsex, oAskype, oAweixin, callback) {
    var Querystr = "INSERT INTO `OfficialWebsiteData`.`UserT`(`ID`, `oAName`, `oAEmail`, `oAPaonee`, `oAcodes`, `oApassword`, `oAhobby`, `oAsex`, `oAskype`, `oAtimer`, `oAweixin`) VALUES (NULL, '" + oAName + "', '" + oAEmail + "', '" + oAPaonee + "', '" + oAcodes + "', '" + oApassword + "', '" + oAhobby + "', '" + oAsex + "', '" + oAskype + "', CURRENT_TIMESTAMP, '" + oAweixin + "');"
    woreData(Querystr, function (param, error) {
        callback(param, error)
    })
}

//普通用户注册
function writeUserP(oAName, oAEmail, oAPaonee, oApassword, oAhobby, oAsex, oAskype, oAweixin, callback) {
    var Querystr = "INSERT INTO `OfficialWebsiteData`.`UserP`(`ID`, `oAName`, `oAEmail`, `oAPaonee`, `oApassword`, `oAhobby`, `oAsex`, `oAskype`, `oAtimer`, `oAweixin`) VALUES (null, '" + oAName + "', '" + oAEmail + "', '" + oAPaonee + "', '" + oApassword + "', '" + oAhobby + "', '" + oAsex + "', '" + oAskype + "', CURRENT_TIMESTAMP, '" + oAweixin + "');"
    woreData(Querystr, function (param, error) {
        callback(param, error)
    })
}



//通过emal查询普通用户信息
function queryUserPbyEmal(emal, callback) {
    var Querystr = "SELECT * FROM `UserP` WHERE oAEmail = '" + emal + "'"
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}

//通过emal查询教师信息

function queryUserTbyEmal(emal, callback) {
    var Querystr = "SELECT * FROM `UserT` WHERE oAEmail = '" + emal + "'"
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}

//通过emal查询所有用户资料
function queryUserinformbyEmal(emal, callback) {
    var strQuery = "select * FROM `Userinformation` WHERE `Email` = '" + emal + "'"
    woreData(strQuery, function (data, error) {
        callback(data, error)
    })
}

//查询所有用户资料
function queryUserinform(callback) {
    var strQuery = "select * FROM `Userinformation` WHERE `ImgUrl` != '' AND `Name` != ''"
    woreData(strQuery, function (data, error) {
        callback(data, error)
    })
}


//通过Emal查询所有用户资料
function queryEmalbyUserinform(emal, callback) {
    var strQuery = "select * FROM `Userinformation` WHERE `Email` = '" + emal + "'"
    woreData(strQuery, function (data, error) {
        callback(data, error)
    })
}


//创建用户初始资料卡
function creatUserinform(emal, callback) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`Userinformation`(`ID`, `Email`,`isfirst`) VALUES (NULL, '" + emal + "',0);"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}

//创建老师用户初始资料卡
function creatUserTinform(emal, code, callback) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`Userinformation`(`ID`, `Email`,`isfirst`,`Grade`) VALUES (NULL, '" + emal + "',0," + code + ");"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}

//通过emal更新视频url
function updayeVidoUrlbyemal(emal, VidoUrl, callback) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`Userinformation` SET  `vedioUrl` = '" + VidoUrl + "' WHERE `Email` = '" + emal + "';"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}

//通过emal更新图片url
function updayeImgUrlbyemal(emal, imgurl, callback) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`Userinformation` SET  `ImgUrl` = '" + imgurl + "' WHERE `Email` = '" + emal + "';"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}


//通过emal更新用户资料
function updateUserProfilebyemal(emal, Name, NameID, EngID, JanpenName, BlankID, School, Home, yearHome, SkypeID, WeixinID, yearData, Sex, Phpne, Lesson, treHeader, terData, terData2, moeny1, moeny2, Blanknum, Blanktit, xianzaizhiye, chushengdi, kouzuofanhao, renID, telID, kouzuomin, callback) {
    var Querystr = "UPDATE `OfficialWebsiteData`.`Userinformation` SET  `Name` = '" + Name + "', `NameID` = '" + NameID + "', `EngID` = '" + EngID + "', `JanpenName` = '" + JanpenName + "', `BlankID` = '" + BlankID + "', `School` = '" + School + "', `Home` = '" + Home + "', `yearHome` = '" + yearHome + "', `SkypeID` = '" + SkypeID + "', `WeixinID` = '" + WeixinID + "', `yearData` = '" + yearData + "', `Sex` = '" + Sex + "', `Phpne` = '" + Phpne + "', `Lesson` = '" + Lesson + "', `treHeader` = '" + treHeader + "', `terData` = '" + terData + "', `terData2` = '" + terData2 + "',`moeny1` = '" + moeny1 + "', `moeny2` = '" + moeny2 + "',isfirst = 1, `Blanknum` = '" + Blanknum + "', `Blanktit` = '" + Blanktit + "', xianzaizhiye = '" + xianzaizhiye + "',chushengdi = '" + chushengdi + "',kouzuofanhao = '" + kouzuofanhao + "' ,renID = '" + renID + "',telID = '" + telID + "',kouzuomin = '" + kouzuomin + "' WHERE `Email` = '" + emal + "';"
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}


//通过老师ID查询老师信息
function queryUserTInfoByID(ID, callback) {
    var Querystr = "SELECT * FROM `OfficialWebsiteData`.`Userinformation` WHERE ID = " + ID
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}



//通过商品ID查询商品信息
function queryCommodityInfoByID(ID, callback) {
    var Querystr = "SELECT * FROM `ProductList` WHERE ID = " + ID
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}


//创建订单
function CreatOrder(UserID, UserEmal, OrderNumber, CommodityID, OrderStatus, OrderAmount, integral, Yen, callback) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`OrderList`(`ID`, `UserID`, `Useremail`, `OrderNumber`, `CommodityID`, `OrderCreationdate`, `OrderExpirationdate`, `OrderStatus`, `OrderAmount`,`integral`,`Yen`) VALUES (0, " + UserID + ", '" + UserEmal + "', '" + OrderNumber + "', '" + CommodityID + "', now(), date_add(now(), interval 1 hour), " + OrderStatus + ", '" + OrderAmount + "' , " + integral + " , " + Yen + ");"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}

//通过邮箱查询积分
function queryPointsbyemal(UserEmal, callback) {
    var Querystr = "SELECT * FROM `money` WHERE UserEmal = '" + UserEmal + "'"
    woreData(Querystr, function (data, error) {
        callback(data, error)
    })
}


//模糊匹配老师名字
function queryUserNamebyname(Username, callback) {
    var queryStr = "select * from `Userinformation` where concat(`Name`) like '%" + Username + "%'"
    woreData(queryStr, function (data, error) {
        callback(data, error)
    })
}

//通过老师ID查询是否有这个时间段的数据
function queryTimedatabyID(ID, temp, callback) {
    var querystr = "select * from `tAinformation` where UserID = '" + ID + "'" + "AND timeop = " + "'" + temp + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}
//通过老师邮箱查询这个老师所有时间段的数据
function queryTimedatabyemal(emal, callback) {
    var querystr = "select * from `tAinformation` where UserEmal = '" + emal + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}

function queryallTimedatabyID(ID, callback) {
    var querystr = "select * from `tAinformation` where UserID = '" + ID + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}
//通过老师id创建老师课程时间
function CreatIDbydatatime(ID, emal, time, satus, callback) {
    var querystr = "INSERT INTO `OfficialWebsiteData`.`tAinformation`(`UserID`, `UserEmal`, `timeop`, `status`) VALUES (" + ID + ", '" + emal + "','" + time + "', " + satus + ")"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}





//通过老师id修改老师课程状态
function updeteIDbystatus(ID, status, temp, callback) {
    var querystr = "UPDATE `OfficialWebsiteData`.`tAinformation` SET `status` = " + status + " WHERE `UserID` = " + ID + " AND timeop = " + "'" + temp + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}


//通过邮箱查询老师ID
function queryUserTIDbyemal(emal, callback) {
    var querystr = "select `ID`,`oAEmail` from `UserT` where oAEmail = '" + emal + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}

//通过邮箱查询小ID
function xqueryUserTIDbyemal(emal, callback) {
    var querystr = "select `ID`,`Email` from `Userinformation` where Email = '" + emal + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}

//查询邀请码是否存在 如果存在返回老师等级以及使用次数
function QueryInvcode(code, callback) {
    var querystr = "select `ID`,`Teachergrade`,`Usageimes` from `coursearrAngement` where `Invitationcode` = '" + code + "'"
    woreData(querystr, function (data, error) {
        callback(data, error)
    })
}


function queryIDbyEmal(ID) {
    var querystr = "SELECT `Email` FROM `Userinformation` WHERE ID = " + ID
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }

        })
    })

}

//通过ID查询老师Emal
function queryIDbyEmalUset(ID) {
    var querystr = "select * from `UserT` where  ID = '" + ID + "'"
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                console.log(error)
                reject(error)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//



//通过emal查询老师ID （UserT表）
function queryEmalbyID(Emal) {
    var querystr = "select `ID` from `UserT` where oAEmail = '" + Emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}



//通过ID查询time
function queryTimebyID(ID) {
    var querystr = "select * from `tAinformation` where UserID = " + ID
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//通过ID查询用户积分 如果没有几默认为0并建表
// function queryIDbymoney(ID) {
//     var querystr = "select * from `money` where UserID = " + ID
//     return new Promise(function (resolve, reject) {
//         woreData(querystr, function (data, error) {
//             if (error) {
//                 console.log(error)
//                 reject(error)
//             }
//             if (!data || data.length == 0) {

//                 resolve(null)
//                 return
//             }
//             else {
//                 resolve(data[0])
//             }
//         })
//     })
// }
//通过Emal查询用户积分
function queryEmalbymoney(Emal) {
    var querystr = "select * from `money` where UserEmal = '" + Emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//通过emal查询Appointment表
function queryEmalbyApp(Emal) {
    var querystr = "select * from `Appointment` where UserEmal = '" + Emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}



//通过老师Emal查询老师课程价格
function queryCurriculumPrice(Emal, isCurr) {
    //是否是特价
    var mem = 'moeny2'
    if (isCurr) {
        mem = 'moeny1'
    }
    var querystr = "select `" + mem + "` from `Userinformation` where Email = '" + Emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                if (isCurr) {
                    resolve(data[0].moeny1)
                }
                resolve(data[0].moeny2)
            }
        })
    })

}




//通过emal查询所有用户资料
function queryUserinformbyEmalPromise(emal) {
    var strQuery = "select `Name`,`Phpne`,`SkypeID`,`WeixinID` FROM `Userinformation` WHERE `Email` = '" + emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(strQuery, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}



//通过emal查询普通用户信息
function queryUserPbyEmalPromise(emal) {
    var Querystr = "SELECT * FROM `UserP` WHERE oAEmail = '" + emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}


//通过邮箱查询积分
function queryPointsbyemalPromise(UserEmal) {
    var Querystr = "SELECT * FROM `money` WHERE UserEmal = '" + UserEmal + "'"
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}
//创建用户积分表
function CreatPoint(UserEmal, ID, num) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`money`(`UserID`, `UserEmal`, `integral`, `Rechargetime`) VALUES (" + ID + ", '" + UserEmal + "', " + num + ", CURRENT_TIMESTAMP);"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//修改老师积分
function nodifyPoint(num, emal) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`money` SET  `integral` = " + Number(num) + ", `Rechargetime` = CURRENT_TIMESTAMP WHERE `UserEmal` = '" + emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(error)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}


//创建预约信息
function creatAppointmentinformation(tUserdata, pUserdata) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`Appointment`(`TeacherID`, `TeacherEmal`, `TeacherTelephone`, `TeacherWeChat`, `TeacherSkypeID`, `TeacherName`, `UserID`, `UserEmal`, `UserTelephone`, `UserSkypeID`, `UserName`, `timeApp`, `Price`,`RMB`,`Yen`,`Leseon`,`Textval`) VALUES (" + tUserdata.ID + ", '" + tUserdata.Email + "', '" + tUserdata.Phpne + "', '" + tUserdata.WeixinID + "', '" + tUserdata.SkypeID + "', '" + tUserdata.Name + "', " + pUserdata.UserID + ", '" + pUserdata.UserEmal + "', '" + pUserdata.oAPaonee + "', '" + pUserdata.oAskype + "', '" + pUserdata.oAName + "', '" + tUserdata.Time + "', '" + tUserdata.moeny + "' ," + tUserdata.RMB + " ," + tUserdata.Yen + ",'" + tUserdata.Leseon + "','" + tUserdata.Textval + "');"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(data.fieldCount)
            }
        })
    })
}

//

//修改预约状态
function modifyMakeanappointment(ID, Emal, time, status) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`tAinformation` SET  `status` = " + status + " WHERE `UserID` = " + ID + " AND `UserEmal` = '" + Emal + "' AND `timeop` = '" + time + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {

            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(data.fieldCount)
            }
        })
    })
}
//
//查询预约信息
function seleteAppointment(emal) {
    var queryStr = "SELECT * FROM `Appointment` WHERE UserEmal = '" + emal + "'" + 'order by `timeApp` asc'
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(null)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data)
            }
        })
    })
}
//查询学生预约信息
function seleteTAppointment(emal) {
    var queryStr = "SELECT * FROM `Appointment` WHERE TeacherEmal = '" + emal + "'" + 'order by `timeApp` asc'
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(null)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data)
            }
        })
    })
}

//获取通过emal和time评价信息
function queryMsgBytime(time) {
    var queryStr = "SELECT `TeacherEmal`,`TeacherID`,`Price`,`Tstatus`,`Pstatus`,`Tmsg`,`Pmsg` FROM `Appointment` WHERE timeApp = '" + time + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(null)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//UPDATE `OfficialWebsiteData`.`Appointment` SET  `Pstatus` = NULL, `Pmsg` = NULL WHERE `timeApp` = '2020-09-14  06:30';


//设置学生评价老师
function setMsgBytime(time, text) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`Appointment` SET  `Pstatus` = 1, `Ptime` = CURRENT_TIMESTAMP, `Pmsg` = '" + text + "' WHERE `timeApp` = '" + time + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(data.fieldCount)
            }
        })
    })
}


//获取学生评价
function getMsgBytime(time) {
    var queryStr = "SELECT `Pmsg` FROM `Appointment` WHERE `timeApp` = '" + time + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(null)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//设置老师评价学生
function setTMsgBytime(time, text, classhour, TeacherEmal, Text2) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`Appointment` SET `classhour` = " + classhour + " , `Ttime` = CURRENT_TIMESTAMP ,`Tmsg` = '" + text + "',`Text2` = '" + Text2 + "' WHERE `timeApp` = '" + time + "' AND TeacherEmal = '" + TeacherEmal + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(data.fieldCount)
            }
        })
    })
}


//设置老师评价状态
function setTstatusBytime(time) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`Appointment` SET Tstatus = 1 WHERE `timeApp` = '" + time + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(data.fieldCount)
            }
        })
    })
}


//通过订单号查询订单信息
async function queryOrderinformation(number) {
    var queryStr = "SELECT * FROM `OrderList` WHERE `OrderNumber` = '" + number + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                reject(null)
            }
            if (!data || data.length == 0) {
                reject(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//通过订单号设置订单状态
async function setOrderstatus(code, status) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`OrderList` SET `OrderStatus` = " + status + " WHERE `OrderNumber` = '" + code + "'"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(true)
            }
        })
    })
}

//创建支付宝订单信息
async function CreatAppinfo(data) {
    var queryStr = "INSERT INTO `OfficialWebsiteData`.`AlipayOrder`(`trade_no`, `buyer_id`, `total_amount`, `receipt_amount`, `invoice_amount`, `buyer_pay_amount`, `gmt_create`, `gmt_payment`, `out_trade_no`) VALUES ('" + data.trade_no + "', '" + data.buyer_id + "', '" + data.total_amount + "', '" + data.receipt_amount + "', '" + data.invoice_amount + "', '" + data.buyer_pay_amount + "', '" + data.gmt_create + "', '" + data.gmt_payment + "', '" + data.out_trade_no + "')"
    return new Promise(function (resolve, reject) {
        woreData(queryStr, function (data, error) {
            if (error) {
                data = {}
                resolve(data.fieldCount)
            }
            if (!data || data.length == 0) {
                data = {}
                resolve(data.fieldCount)
            }
            else {
                resolve(true)
            }
        })
    })
}

async function asyncqueryCommodityInfoByID(ID) {
    var Querystr = "SELECT * FROM `ProductList` WHERE ID = " + ID
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                resolve(null)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}


//通过emal查询普通用户信息
async function asyncqueryUserPbyEmalPromise(emal) {
    var Querystr = "SELECT * FROM `UserP` WHERE oAEmail = '" + emal + "'" + 'order by `timeApp` DESC'
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                resolve(null)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

async function asyncqueryUserTbyEmal(emal) {
    var Querystr = "SELECT * FROM `UserT` WHERE oAEmail = '" + emal + "'"
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                resolve(null)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//通过Emal和特定预约状态 1 2 3 4 5  查询预约信息
function querytAinformationByEmal(emal, status) {
    var Querystr = "SELECT * FROM `tAinformation` WHERE `UserEmal` = '" + emal + "' AND `status` = " + status
    return new Promise(function (resolve, reject) {
        woreData(Querystr, function (data, error) {
            if (error) {
                resolve(null)
            }
            if (!data || data.length == 0) {
                resolve(null)
            }
            else {
                resolve(data[0])
            }
        })
    })
}

//通过邮箱判断是否是老师账号
async function isTeacher(Temal) {
    var queryStr = "SELECT * FROM `UserT` WHERE `oAEmail` = '" + Temal + "'"
    return new Promise((resove, reject) => {
        woreData(queryStr, (data, err) => {
            if (err) {
                resove(false)
            } else if (data instanceof Array) {
                if (data.length == 0) {
                    resove(false)
                } else {
                    resove(true)
                }
            } else {
                resove(false)
            }
        })
    })
}

//通过老师邮箱查询学生评价信息  
async function queryStudentEvaluationByEmal(Emal) {
    var querystr = "SELECT `Pmsg`,`UserName`,`Ptime`,`Price` FROM `Appointment` WHERE `Pstatus` = 1 AND `TeacherEmal` = '" + Emal + "' order by `Ptime` DESC "
    return new Promise((resove, reject) => {
        woreData(querystr, (data, err) => {
            if (err) {
                resove(false)
            } else if (data instanceof Array) {
                if (data.length == 0) {
                    resove(false)
                } else {
                    resove(data)
                }
            } else {
                resove(false)
            }
        })
    })
}

//通过老师邮箱查询老师对学生评价信息
async function queryTStudentEvaluationByEmal(Emal) {
    var querystr = "SELECT `Pmsg`,`UserName`,`Ptime`,`RMB` FROM `Appointment` WHERE `Tstatus` = 1 AND `TeacherEmal` = '" + Emal + "' order by `Ptime` DESC "
    return new Promise((resove, reject) => {
        woreData(querystr, (data, err) => {
            if (err) {
                resove(false)
            } else if (data instanceof Array) {
                if (data.length == 0) {
                    resove(false)
                } else {
                    resove(data)
                }
            } else {
                resove(false)
            }
        })
    })
}


//通过学生邮箱查询评价信息
async function queryTeacherEvaluationByEmal(Emal) {
    var querystr = "SELECT `Tmsg`,`TeacherName`,`Ttime`,`Price` FROM `Appointment` WHERE `Tstatus` = 1 AND `UserEmal` = '" + Emal + "'  order by `Ttime` DESC "
    return new Promise((resove, reject) => {
        woreData(querystr, (data, err) => {
            if (err) {
                resove(false)
            } else if (data instanceof Array) {
                if (data.length == 0) {
                    resove(false)
                } else {
                    resove(data)
                }
            } else {
                resove(false)
            }
        })
    })
}