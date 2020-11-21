const main = require('./main')

exports.appraisal_authority = appraisal_authority


async function appraisal_authority(Emal) {
    var query_statement = "SELECT `Grade` FROM `Userinformation` WHERE `Email` = ?"
    var value = [String(Emal)]
    var ret = await main.sqlquery(query_statement, value).catch((error) => {
        console.error("function:appraisal_authority---" + query_statement + "::error" + error)
        return 404
    })
    if(ret instanceof  Array)
    {
        if(ret.length != 0)
        {
            try
            {
                return ret[0].Grade
            }
            catch(e)
            {
                console.error("function:appraisal_authority---" + query_statement + "::error" + error)
                return 404
            }
        }
    }
    return 404
    
}
