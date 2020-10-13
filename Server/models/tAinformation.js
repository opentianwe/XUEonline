

const main = require('./main')

exports.modify_Makeanappointment = modify_Makeanappointment

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