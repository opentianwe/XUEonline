const mysql = require('./msOp')
exports.UpdatePoints = UpdatePoints
exports.aUpdatePoints = aUpdatePoints


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