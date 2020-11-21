
const main = require('./main') 
exports.query_List = query_List


async function query_List(email) {
    var queryStr = "SELECT `ID` FROM `OrderList` WHERE `Useremail` = ? AND `CommodityID` = 0"
    var value = [String(email)]
    var ret = await main.sqlquery(queryStr, value)
    if (ret instanceof Array) {
        if (ret.length == 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}