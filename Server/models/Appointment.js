


const main = require('./main')
exports.queryAppointment_alldata_Byemail = queryAppointment_alldata_Byemail
exports.queryAppointment_alldata_BytimeApp = queryAppointment_alldata_BytimeApp
exports.deleteAppointment_alldata_BytimeApp = deleteAppointment_alldata_BytimeApp

async function queryAppointment_alldata_Byemail(emal,time)
{
    var queryStr = "SELECT * FROM `Appointment` WHERE UserEmal = ? AND timeApp = ?"
    var value = [String(emal),String(time)]
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

// function seleteAppointment(emal) {
//     var queryStr = "SELECT * FROM `Appointment` WHERE UserEmal = '" + emal + "'"
//     return new Promise(function (resolve, reject) {
//         woreData(queryStr, function (data, error) {
//             if (error) {
//                 reject(null)
//             }
//             if (!data || data.length == 0) {
//                 reject(null)
//             }
//             else {
//                 resolve(data)
//             }
//         })
//     })
// }