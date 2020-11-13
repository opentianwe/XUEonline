const mysql = require('./msOp')
exports.UpdatePoints = UpdatePoints
exports.aUpdatePoints = aUpdatePoints
exports.isJap = isJap
exports.getCurrentTime = getCurrentTime
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



function getCurrentTime(t) {
    //t为时区参数  默认东八区北京时间
    if (!t) t = 8;
    const time = new Date();
    const len = time.getTime();
    const offset = time.getTimezoneOffset() * 60000; //本地时间与GMT时间差值
    const utcTime = len + offset;  //格林尼治时间
    const date = new Date(utcTime + 3600000 * t); //格林尼治时间和当前时区差值
    const y = date.getFullYear(),
        mon = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    //不足两位补0
    function addZero(value) {
        if (value < 10) return "0" + value;
        else return value;
    }
    const result = y + "-" + addZero(mon) + "-" + addZero(d) + "  " + addZero(h) + ":" + addZero(m) + ":" + addZero(s);
    return result
}
//console.log( getCurrentTime(9));