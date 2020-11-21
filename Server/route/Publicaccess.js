const express = require('express')
const mysql = require('../msOp')
const url = require('url');
const { connect } = require('http2');

const router = express.Router()
const model_Ainfor = require('../models/tAinformation');
const { Console } = require('console');
router.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //接收ajax请求手动提交的cookie信息
    res.header("Access-Control-Allow-Credentials", true);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
});

router.get('/Atinfo', function (req, res) {
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    if (req.query.index == undefined || req.query.np == undefined || req.query.type == undefined) {
        res.send("error")
        return
    }
    var numIndex = Number(req.query.index)
    var numNp = Number(req.query.np)
    var type = Number(req.query.type)
    if (numIndex == 0 || numNp == 0) {
        res.send("error")
        return
    }
    if (type == 0) {
        type = 1
    }


    mysql.queryUserinform(function (data, err) {
        try {
            var Count = data.length
            if (Count == 0) {
                res.send(err)
                return
            }
        } catch (e) {
            res.send(e)
            return
        }


        var datas = new Array()
        if (type >= 5) {
            var sex
            if (type == 5) {
                sex = '男'
            } else if (type == 6) {
                sex = '女'
            }
            for (var i = 0; i < Count; i++) {
                if (data[i].Sex == sex) {
                    datas.push(data[i])
                    continue
                }

            }
        } else {
            for (var i = 0; i < Count; i++) {
                var less = String(data[i].Lesson).split(",")
                for (var j = 0; j < less.length; j++) {

                    if (Number(less[j]) == type) {
                        datas.push(data[i])
                        break
                    }
                }
            }
        }

        Count = datas.length
        var PageCount = datas.length / req.query.np

        if (datas.length % req.query.np != 0) {
            PageCount += 1
        }
        if (numIndex > PageCount) {
            res.send("error")
            return
        }

        if (datas.length == 0) {
            res.send("error")
            return
        }

       
        var database = new Array()
        var age = (numIndex - 1) * numNp
        var sin = 0
        async function pushweek(data,res)
        {
            for (var i = age; i < age + numNp; i++) {
                if (i > Count) {
                    break;
                }
                data[i].ClassHoursThisWeek = await model_Ainfor.query_ClassHoursThisWeek_Byemal(data[i].Email)
                data[i].ClassHoursOfTheDay = await model_Ainfor.query_ClassHoursOfTheDay(data[i].Email)  
                console.log(data[i].ClassHoursOfTheDay + ":" + i)
                database.push(data[i])
                sin++
            }
            var da = {
                PageCount: datas.length,
                Totalpage: parseInt(PageCount),
                Singlepage: sin,
                lists: database
            }
            res.send(da)
        }
        pushweek(data,res)
    
    })
})


router.get('/Tsearch', function (req, res) {
    var parseObj = url.parse(req.url, true)
    req.query = parseObj.query
    if (req.query.index == undefined || req.query.np == undefined) {
        res.send("error")
        return
    }
    var numIndex = Number(req.query.index)
    var numNp = Number(req.query.np)

    if (numIndex == 0 || numNp == 0) {
        res.send("error")
        return
    }

    if (req.query.search != undefined) {
        mysql.queryUserNamebyname(req.query.search, function (data, err) {
            if (err || data == []) {
                res.send("error")
                return
            }
            var Count = data.length
            var PageCount = data.length / req.query.np
            console.log(data)

            Count = data.length
            var PageCount = data.length / req.query.np

            if (data.length % req.query.np != 0) {
                PageCount += 1
            }
            if (numIndex > PageCount) {
                res.send("error")
                return
            }

            var database = new Array()
            var age = (numIndex - 1) * numNp
            var sin = 0
            for (var i = age; i < age + numNp; i++) {
                if (i >= Count) {
                    break;
                }
             
                database.push(data[i])
                sin++
            }
            var da = {
                PageCount: data.length,
                Totalpage: parseInt(PageCount),
                Singlepage: sin,
                lists: database
            }
            res.send(da)
        })

    } else {
        res.send("error")
        return
    }
})

module.exports = router