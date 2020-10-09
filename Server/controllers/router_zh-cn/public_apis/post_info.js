const express = require('express')
const mysql = require('../../../msOp')
const url = require('url');
const router = express.Router()




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
        for (var i = age; i < age + numNp; i++) {
            if (i >= Count) {
                break;
            }
            database.push(datas[i])
            sin++
        }
        
        var da = {
            PageCount: datas.length,
            Totalpage: parseInt(PageCount),
            Singlepage: sin,
            lists: database
        }
        res.send(da)
    })
})



module.exports = router