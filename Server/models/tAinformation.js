

const main = require('./main')

exports.modify_Makeanappointment = modify_Makeanappointment

exports.query_MsgBytime = query_MsgBytime

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