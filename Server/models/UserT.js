const main = require('./main')

exports.query_usert_Emal_byID = query_usert_Emal_byID


async function query_usert_Emal_byID(ID) {
    var querystr = "select * from `UserT` where  ID = ?"
    var ret = await main.sqlquery(querystr, [ID])
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