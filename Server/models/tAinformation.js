

const main = require('./main')

exports.modify_Makeanappointment = modify_Makeanappointment

exports.query_MsgBytime = query_MsgBytime

exports.query_ClassHoursThisWeek_Byemal = query_ClassHoursThisWeek_Byemal
exports.query_ClassHoursOfTheDay = query_ClassHoursOfTheDay

async function modify_Makeanappointment(Emal, time, status) {
    var queryStr = "UPDATE `OfficialWebsiteData`.`tAinformation` SET  `status` = ? WHERE  `UserEmal` = ? AND `timeop` = ?"
    var value = [Number(status),String(Emal),String(time)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret.affectedRows == 1)
    {
        return true
    }
    return false  
}


//获取通过emal和time评价信息
async function query_MsgBytime(time,emal) {
    var queryStr = "SELECT `TeacherEmal`,`TeacherID`,`Price`,`Tstatus`,`Pstatus`,`Tmsg`,`Pmsg` FROM `Appointment` WHERE timeApp = ? AND TeacherEmal = ?"
    var value = [String(time),String(emal)]
    var ret = await main.sqlquery(queryStr, value)
    if (ret instanceof Array) {
        if (ret.length == 0) {
            return false
        } else {
            return ret[0]
        }
    } else {
        return false
    }
}

//通过老师邮箱获取本周可以预约课时
// SELECT `UserID`  FROM `tAinformation`  WHERE YEARWEEK(date_format(timeop,'%Y-%m-%d')) = YEARWEEK(now()) AND `status` = 1 AND `UserEmal` = 'XUEonline2020@gmail.com' 
async function query_ClassHoursThisWeek_Byemal(emal)
{
    var querystr = "SELECT `UserID`  FROM `tAinformation`  WHERE YEARWEEK(date_format(timeop,'%Y-%m-%d')) = YEARWEEK(now()) AND `status` = 1 AND `UserEmal` = ?"
    var ret = await main.sqlquery(querystr, [emal])
    if (ret instanceof Array) {
       return ret.length
    } else {
        return 0
    }
}

async function query_ClassHoursOfTheDay(emal)
{
    var querystr = "select * from `tAinformation` where TO_DAYS(timeop) = TO_DAYS(NOW()) AND `status` = 1 AND `UserEmal` = ?"
    var ret = await main.sqlquery(querystr, [emal])
    if (ret instanceof Array) {
       return ret.length
    } else {
        return 0
    }
}