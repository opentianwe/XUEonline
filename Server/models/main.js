const mysql = require('mysql')
exports.sqlquery = sqlquery
var pool = mysql.createPool({
    host: '39.106.89.79',
    user: 'Tian',
    password: 'Tian123.',
    database: 'OfficialWebsiteData'
})

function sqlquery(sentence, value, callback = null) {
    sentence = mysql.format(sentence, value)
    return new Promise((resove, rejact) => {
        pool.getConnection(function (error, connect) {
            if (error) {
                console.error("function:sqlquery---" + sentence + "::error" + error)
                rejact(error)
                if (callback) {
                    callback([], error)
                }
                return
            }
            try {
                connect.query(sentence, function (error, data) {
                    pool.releaseConnection(connect)
                    if (error) {
                        console.error("function:sqlquery---" + sentence + "::error" + error)
                        rejact(error)
                        if (callback) {
                            callback([], error)
                        }
                        return
                    } else {
                        resove(data)
                        if (callback) {
                            callback(data, [])
                        }
                    }
                })
            } catch (error) {
                console.error("function:sqlquery---" + sentence + "::error" + error)
                rejact(error)
                if (callback) {
                    callback([], error)
                }
            }

        })
    })
}



