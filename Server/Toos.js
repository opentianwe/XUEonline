const mysql = require('./msOp')
exports.UpdatePoints = UpdatePoints
exports.aUpdatePoints = aUpdatePoints
exports.isJap = isJap

function UpdatePoints(num, Emal, ID) {
    return new Promise(function(res,rev){
        mysql.queryPointsbyemalPromise(Emal)
        .then(function (data) {
            if (data == null) {
                return mysql.CreatPoint(Emal, ID, num)
            }
            return mysql.nodifyPoint((data.integral + num),Emal)
        }, function (err) {
            rev(false)
        })
        .then(function (data) {
            res(true)
               
        }, function (err) {
            rev(false)
        })
    })
}

async function aUpdatePoints(num, Emal, ID) {
    return new Promise(function(res,rev){
        mysql.queryPointsbyemalPromise(Emal)
        .then(function (data) {
            if (data == null) {
                return mysql.CreatPoint(Emal, ID, num)
            }
            return mysql.nodifyPoint((data.integral + num),Emal)
        }, function (err) {
            res(false)
        })
        .then(function (data) {
            res(true)
               
        }, function (err) {
            res(false)
        })
    })
}


//通过Url最后的路径判断url是否时来自日语版的请求
function isJap(Url)
{
    try {
        var UrlArray = Url.split('/')
        UrlArray = UrlArray[UrlArray.length - 1].split('?')
        if(UrlArray[0] == 'ja_JP')
        {
            return true
        }else
        {
            return false
        }
    }catch(e)
    {
        console.error(e)
        return false
    }
}