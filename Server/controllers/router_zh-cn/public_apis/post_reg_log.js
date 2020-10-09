const express = require('express')
const route = express.Router()
const mysql = require('../../../msOp')




//注册接口
route.post("/register", function (req, res) {
    var Userdata = '';
    req.on('data', function (data) {
        Userdata += data;
    })
    req.on('end', function () {
        try {
            Userdata = JSON.parse(Userdata)
        } catch (e) {
            res.send({
                stats: 0,
                msg: '数据异常',
                error: e
            });
            return
        }
        if (String(Userdata.oAcodes) != undefined && Userdata.oAcodes != '' && String(Userdata.oAcodes).length != 0 && Userdata.oAcodes != null) {

            mysql.QueryInvcode(Userdata.oAcodes,function(data,err){
               
              if(data.length == 0 || err)
              {
                res.send({
                    status: 0,
                    msg: "邀请码错误或者已失效!"
                })
                return;
              }
              console.log(data)
                mysql.creatUserTinform(Userdata.oAEmail, data[0].Teachergrade,function (data, err) {
                    if (err) {
                        res.send({
                            status: 0,
                            msg: "邮箱已存在!",
                            error: err
                        })
                        return;
                    }
                   
                    mysql.writeUserT(Userdata.oAName, Userdata.oAEmail,
                        Userdata.oAPaonee, Userdata.oAcodes,
                        Userdata.oApassword, Userdata.oAhobby,
                        Userdata.oAsex, Userdata.oAskype,
                        Userdata.oAweixin,
                        function (data, err) {
                            if (err) {
                                var errorStr = String(err)
                                try {
                                    var sp = errorStr.split(':')
                                } catch (e) {
                                    res.send({
                                        status: 0,
                                        msg: "数据异常!",
                                        error: e
                                    })
                                    return
                                }
                                if (sp[2].search('oAEmail') != -1) {
                                    res.send({
                                        status: 0,
                                        msg: "邮箱已存在!",
                                        error: errorStr
                                    })
                                    return
                                } else if (sp[2].search('oAPaonee') != -1) {
                                    res.send({
                                        status: 0,
                                        msg: "手机号已存在!",
                                        error: errorStr
                                    })
                                    return
                                } else {
                                    res.send({
                                        status: 0,
                                        msg: '数据异常',
                                        error: e
                                    });
                                    return
                                }
    
                            } else {
                                  res.cookie("malli", Userdata.oAEmail, { maxAge: new Date(Date.now() + 900000), signed: true })
                                    res.send({
                                        status: 2,
                                        msg: '注册成功!'
                                    })
                            }
    
                        })
                })
            })
            
          
        } else {

            mysql.creatUserinform(Userdata.oAEmail, function (data, err) {
                if (err) {
                    res.send({
                        status: 0,
                        msg: "邮箱已存在!",
                        error: err
                    })
                    return;
                }
                mysql.writeUserP(Userdata.oAName, Userdata.oAEmail,
                    Userdata.oAPaonee, Userdata.oApassword,
                    Userdata.oAhobby, Userdata.oAsex,
                    Userdata.oAskype, Userdata.oAweixin,
                    function (data, err) {
                        if (err) {
                            var errorStr = String(err)
                            try {
                                var sp = errorStr.split(':')
                            } catch (e) {
                                res.send({
                                    status: 0,
                                    msg: "数据异常!",
                                    error: e
                                })
                                return
                            }
                            if (sp[2].search('oAEmail') != -1) {
                                res.send({
                                    status: 0,
                                    msg: "邮箱已存在!",
                                    error: errorStr
                                })
                                return
                            } else if (sp[2].search('oAPaonee') != -1) {
                                res.send({
                                    status: 0,
                                    msg: "手机号已存在!",
                                    error: errorStr
                                })
                                return
                            } else {
                                res.send({
                                    status: 0,
                                    msg: '数据异常',
                                    error: e
                                });
                                return
                            }

                        } else {
                            res.cookie("malli", Userdata.oAEmail, { maxAge: new Date(Date.now() + 900000), signed: true })
                            res.send({
                                status: 1,
                                msg: "注册成功!"
                            })
                        }

                    })
            })
        }

    })
})

//登录接口
route.post("/login", function (req, res) {
    var Userdata = '';
    req.on('data', function (data) {
        Userdata += data;
    })
    req.on('end', function () {
        try {
            Userdata = JSON.parse(Userdata)
        } catch (e) {
            res.send({
                stats: 0,
                msg: '数据异常',
                error: e
            });
            return
        }
        if (Userdata.Email != '' && Userdata.Password != '' && Userdata.Email != undefined && Userdata.Password != undefined) {
            mysql.queryUserTbyEmal(Userdata.Email, function (data, err) {
                if (err) {
                    res.send({
                        stats: 0,
                        msg: '数据异常',
                        error: err
                    });
                    return
                }
                if (data.length != 0) {
                    if (data[0].oApassword == Userdata.Password) {
                        res.cookie("malli", Userdata.Email, { maxAge: new Date(Date.now() + 900000), signed: true ,path:'/'})
                        res.send({
                            stats: 0,
                            msg: '登录成功!',
                            type: 1
                        });
                        return
                    } else {
                        res.send({
                            stats: 0,
                            msg: '账号或密码错误'
                        });
                        return
                    }
                } else {
                    mysql.queryUserPbyEmal(Userdata.Email, function (data, err) {
                        if (err) {
                            res.send({
                                stats: 0,
                                msg: '数据异常',
                                error: err
                            });
                            return
                        }
                        if (data.length != 0) {
                            if (data[0].oApassword == Userdata.Password) {
                                res.cookie("malli", Userdata.Email, { maxAge: new Date(Date.now() + 900000), signed: true })
                                res.send({
                                    stats: 0,
                                    msg: '登录成功!',
                                    type: 0
                                });
                                return
                            } else {
                                res.send({
                                    stats: 0,
                                    msg: '账号或密码错误'
                                });
                                return
                            }
                        } else {
                            res.send({
                                stats: 0,
                                msg: '账号或密码错误'
                            });
                            return
                        }
                    })
                }

            })
        } else {
            res.send({
                stats: 0,
                msg: '数据异常'
            });
            return
        }
    })
})

module.exports = route