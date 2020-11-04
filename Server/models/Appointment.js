const main = require('./main')
exports.queryAppointment_alldata_Byemail = queryAppointment_alldata_Byemail
exports.queryAppointment_alldata_BytimeApp = queryAppointment_alldata_BytimeApp
exports.deleteAppointment_alldata_BytimeApp = deleteAppointment_alldata_BytimeApp
exports.queryAppointment_Pmsg_Byemail = queryAppointment_Pmsg_Byemail
exports.queryAppointment_alldata_ByUserEmal = queryAppointment_alldata_ByUserEmal
exports.queryAppointment_isSpecialOffer_Byemail = queryAppointment_isSpecialOffer_Byemail
exports.queryAppointment_SingleData_Byemail = queryAppointment_SingleData_Byemail

async function queryAppointment_alldata_Byemail(TeacherEmal,emal,time)
{
    var queryStr = "SELECT * FROM `Appointment` WHERE `UserEmal` = ? AND `timeApp` = ? AND `TeacherEmal` = ?"
    var value = [String(emal),String(time),String(TeacherEmal)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret instanceof Array)
    {
        if(ret.length == 0)
        {
            return false
        }else
        {
            return ret[0]
        }
    }else
    {
        return false
    }
}

async function queryAppointment_alldata_BytimeApp(timeApp)
{
    var queryStr = "SELECT * FROM `Appointment` WHERE timeApp = ?"
    var value = [String(timeApp)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret instanceof Array)
    {
        if(ret.length == 0)
        {
            return false
        }else
        {
            return ret[0]
        }
    }else
    {
        return false
    }
}

async function deleteAppointment_alldata_BytimeApp(timeApp,UserEmal,TeacherEmal)
{
    var queryStr = "DELETE FROM `Appointment` WHERE timeApp = ? AND UserEmal = ? AND TeacherEmal = ?"
    var value = [String(timeApp),String(UserEmal),String(TeacherEmal)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret.affectedRows == 1)
    {
        return true
    }
    return false     
}

async function queryAppointment_alldata_ByUserEmal(UserEmal)
{
    var queryStr = "SELECT `TeacherName`,`timeApp`,`Text2`,`Leseon` FROM `Appointment` WHERE  UserEmal = ?"
    var value = [String(UserEmal)]
        var ret = await main.sqlquery(queryStr,value)
    if(ret instanceof Array)
    {
        if(ret.length == 0)
        {
            return false
        }else
        {
            return ret
        }
    }else
    {
        return false
    }
}

async function queryAppointment_Pmsg_Byemail(TeacherEmal,emal,id)
{
    var queryStr = "SELECT `Pmsg`,`UserName` FROM `Appointment` WHERE `UserEmal` = ? AND `Pstatus` = 1 AND `TeacherEmal` = ? AND `UserID` = ?"
    var value = [String(emal),String(TeacherEmal),Number(id)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret instanceof Array)
    {
        if(ret.length == 0)
        {
            return false
        }else
        {
            return ret
        }
    }else
    {
        return false
    }
}

function queryAppointment_isSpecialOffer_Byemail(TeacherEmal,UserEmal)
{
    var querystr = "SELECT * FROM `Appointment` WHERE TeacherEmal = ? AND UserEmal = ?"
    return new Promise(function (resolve, reject) {
        var value = [String(TeacherEmal),String(UserEmal)]
        main.sqlquery(querystr,value,(data,error)=>{
            console.log(Boolean(error))
            if(error == true) {
                resolve(null)
                return
            }
            if (!data || data.length == 0) {
                resolve(null)
                return
            }
            else {
                resolve(data)
            }
        })
    })
}

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

async function queryAppointment_SingleData_Byemail(timeApp,TeacherID,UserEmal)
{
    var queryStr = "SELECT * FROM `Appointment` WHERE `timeApp` = ? AND `TeacherID` = ? AND `UserEmal` = ?"
    var value = [String(timeApp),String(TeacherID),String(UserEmal)]
    var ret = await main.sqlquery(queryStr,value)
    if(ret instanceof Array)
    {
        if(ret.length == 0)
        {
            return false
        }else
        {
            return ret[0]
        }
    }else
    {
        return false
    }
}