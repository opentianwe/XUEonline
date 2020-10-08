const main = require('./main')

exports.appraisal_authority = appraisal_authority

/**
 * @brief  Cookie鉴权 通过用户Emal查询返回用户身份
 * @param  {*} Emal  用户邮箱
 * @return 老师对应等级返回1,2,3 普通用户返回null  
 * @note   如果不存在返回404
 * @Time   2020/10/08 20：03
 * @name   Tian
 */
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
