const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer')
const UUID = require('uuid')
const cookieParser = require('cookie-parser')
const mysql = require('../msOp')
const fs = require('fs')
router.use(cookieParser("wcasd2398123asd12aasd"))
// router.use(function (req, res, next) {
//     if(req.signedCookies.malli == undefined || req.signedCookies.malli == '')
//     {
//         res.send({
//             state: 0,
//             msg: "Cookies校验失败!,请跳转到登录页"
//         })
//         return;
//     }else
//     {
//         next();
//     }  
// });



const g_path = path.resolve(__dirname,"..","public","upload") 
console.log(g_path)
//设置保存规则
var storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: g_path,
    //filename：设置文件保存的文件名
    
    filename: function(req, file, cb) {
        let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
        let fileName = UUID.v1()
        cb(null, fileName + extName)
    }
})

//设置过滤规则（可选）
//wmv,avi,rmvb,mp4
var imageFilter = function(req, file, cb){
    var acceptableMime = ["video/mp4","application/vnd.rn-realmedia-vbr","video/avi","video/x-ms-wmv",'image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    //微信公众号只接收上述四种类型的图片
    if(acceptableMime.indexOf(file.mimetype) !== -1){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

//创建 multer 实例
var imageUploader = multer({ 
    storage: storage,
    fileFilter: imageFilter
}).array('file', 1)    //定义表单字段、数量限制

router.post('/upload', imageUploader, function(req, res) {
    if(req.files == undefined)
    {
        res.send({
            state:0,
            msg:"文件上传失败,检查文件格式或文件大小,支持的视频格式有: .wmv .avi .rmvb .mp4,支持的图片格式有: .jpeg .png .jpg .gif"
        })
        return
    }
    if(req.files.length == 0)
    {
        res.send({
            state:0,
            msg:"文件上传失败,检查文件格式或文件大小,支持的视频格式有: .wmv .avi .rmvb .mp4,支持的图片格式有: .jpeg .png .jpg .gif"
        })
        return
    }else
    {
        mysql.queryUserinformbyEmal(req.signedCookies.malli,function(data,err){
            console.log(data.length)
            if(err != null || data.length == 0)
            {
                fs.unlink(g_path + '/' + req.files[0].filename,function(error){
                    res.redirect('/')
                    return;
                })
                 
            }else
            {
                if(data[0].vedioUrl != null)
                {
                    fs.unlink(g_path + '/' + data[0].vedioUrl,function(err){
                    })
                }
                mysql.updayeVidoUrlbyemal(req.signedCookies.malli,req.files[0].filename,function(data,err){
                    if(err)
                    {
                        console.log(err)
                        res.send({
                            state:0,
                            msg:"信息更新错误请稍后重新上传,或联系网站管理员!",
                            err:err
                        })
                        return;
                    }
                    res.send({
                        state:1,
                        msg:req.files[0].filename
                    })
                    return
                })
            }
            
        })
    
    }
})

router.post('/uploadImg', imageUploader, function(req, res) {

    if(req.files == undefined)
    {
        res.send({
            state:0,
            msg:"文件上传失败,检查文件格式或文件大小,支持的视频格式有: .wmv .avi .rmvb .mp4,支持的图片格式有: .jpeg .png .jpg .gif"
        })
        return
    }
    if(req.files.length == 0)
    {
        res.send({
            state:0,
            msg:"文件上传失败,检查文件格式或文件大小,支持的视频格式有: .wmv .avi .rmvb .mp4,支持的图片格式有: .jpeg .png .jpg .gif"
        })
        return
    }else
    {
        mysql.queryUserinformbyEmal(req.signedCookies.malli,function(data,err){
            if(err != null || data.length == 0)
            {
                fs.unlink(g_path + '/' + req.files[0].filename,function(error){
                    res.send({
                        state:0,
                        msg:"Cookies校验失败!,请跳转到登录页"
                    })
                    return;
                })
                 
            }else
            {
                if(data[0].ImgUrl != null)
                {
                    fs.unlink(g_path + '/' + data[0].ImgUrl,function(err){
                    })
                }
                mysql.updayeImgUrlbyemal(req.signedCookies.malli,req.files[0].filename,function(data,err){
                    if(err)
                    {
                        res.send({
                            state:0,
                            msg:"信息更新错误请稍后重新上传,或联系网站管理员!",
                            err:err
                        })
                        return;
                    }
                    res.send({
                        state:1,
                        msg:req.files[0].filename
                    })
                    return
                })
            }
            
        })
    
    }
})
router.get('*',function(req,res){
    res.redirect('./404.html')
}) 
module.exports = router