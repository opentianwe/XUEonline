function yuyanfun(a) {
    if (a == '') {
        swal("Sorry!",'教学科目必须选择', "error")
        return false
    } else {
        return true
    }
}
function getName() {
    let a = $("#Name").val()
    if (a == "") {
        swal("Sorry!",'姓名必须填写', "error")
        return false
    }
    return true
}
function getUserID() {
    let a = $("#UserID").val()
    if (a == "") {
        swal("Sorry!",'日文名称必须填写', "error")
        return false
    }
    return true
}
function getEngName() {
    let a = $("#EngName").val()
    if (a == "") {
        swal("Sorry!",'英文名称必须填写', "error")
        return false
    }
    return true
}
function getJapenName() {
    let a = $("#JapenName").val()
    if (a == "") {
        swal("Sorry!",'出生地不能为空', "error")
        return false
    }
    return true
}
function getYear() {
    let a = $("#getYear").val()
    if (a == "") {
        swal("Sorry!",'出生日期不能为空', "error")
        
        return false
    }
    return true
}
function getSkyepID() {
    let a = $("#SkyepID").val()
    if (a == "") {
        swal("Sorry!",'Skype ID不能为空 如果没有请即时注册！！！', "error")
        return false

    }
    return true
}
function getSchool() {
    let a = $("#School").val()
    if (a == "") {
        swal("Sorry!",'学校不能为空', "error")
        return false
    }
    return true
}
function getYearNuber() {
    let a = $("#yearHome").val()
    if (a == "") {
        swal("Sorry!",'日本居住年限不能为空', "error")
        return false
    }
    return true
}
function getHome() {
    let a = $("#Home").val()
    if (a == "") {
        swal("Sorry!",'地址不能为空', "error")
        return false
    }
    return true
}
function getterData() {
    let a = $("#terData").val()
    if (a == "") {
        swal("Sorry!",'兴趣爱好介绍不能为空', "error")
    
        return false
    }
    return true
}
function getterDatatow() {
    let a = $("#terData2").val()
    if (a == "") {
        swal("Sorry!",'教学经验不能为空', "error")
        return false
    }
    return true
}
function getNum1() {
    let a = $("#Blank-num1").val();
    if (a == '') {
        swal("Sorry!",'收款账户不能为空', "error")
        return false
    }
    return true
}
function getNum2() {
    let a = $("#Blank-num2").val();
    if (a == '') {
        swal("Sorry!",'收款账户开户人姓名不能为空', "error")
        return false
    }
    return true
}
function zheng1() {
    let a = $("#zheng1").val();
    if (a == '') {
        swal("Sorry!",'老师课程价格不能为空', "error")

        return false
    }
    return true
}
function zheng2() {
    let a = $("#zheng2").val();
    if (a == '') {
        swal("Sorry!",'老师课程价格不能为空', "error")
        
        return false
    }
    return true
}
function getimg() {
    var a = $("#avatar")
    var choose_file = $(a)[0].files[0];
    var ftype = choose_file.name.substring(choose_file.name.lastIndexOf(".") + 1);
    //校验格式是否是图片类型
    if (ftype == "jpg" || ftype == "png" || ftype == "jpeg" || ftype == "JPG") {
        //截取图片名称小数点后的字符串  
        //限制大小，照片大小不能超过3M
        var size = choose_file.size / 1024 / 1024;
        if (size > 3) {
            swal("Sorry!",'头像不能大于3M', "error")
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(choose_file);
        reader.onload = function () {
            //回显给上方图片中
            $("#avatar_img").attr("src", this.result);
        }
        var formdata = new FormData();
        formdata.append("file", choose_file);
        return formdata
        // 实例化一个阅读器对象
        // 读取文件的路径，没有返回值,结果在reader.result里  
        // 读取需要时间，读完后再修改图片路径          
    } else {
        swal("Sorry!",'头像格式不正确', "error")
        return false;
    }
}
var AjaxUrl = '../'
$("#avatar").change(function () {
    //拿到文件数据
    getimg()
    var a = getimg()
    $.ajax({
        type: "post",
        url: AjaxUrl + "uploadImg",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: a,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: (d) => {
            if (d.state == 1) {
                swal("Yes!",'上传成功', "success")
            } else {
                swal("Sorry!",'上传失败', "error")
            }
        }
    })

});
layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    
    //普通图片上传
    var uploadInst = upload.render({
      elem: '#test1'
      ,url: '../uploadImg' //改成您自己的上传接口
      ,before: function(obj){
        //预读本地文件示例，不支持ie8
        obj.preview(function(index, file, result){
          $('#demo1').attr('src', result); //图片链接（base64）
        });
      }
      ,done: function(res){
        //如果上传失败
        console.log(res)
        if(res.state==1){
            return layer.msg('上传成功')    
        }
       layer.msg(res.msg) 
      }
      ,error: function(){
        //演示失败状态，并实现重传
        var demoText = $('#demoText');
        demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
        demoText.find('.demo-reload').on('click', function(){
          uploadInst.upload();
        });
      }
    })
})
layui.use(['upload','element'], function(){
    var $ = layui.jquery
    ,upload = layui.upload
    //通过 layui .element 属性 调用这个属性 通过 progress 对象 返回的 n 然后来控制doem 元素 给他加上长度百分比
    ,element = layui.element
      upload.render({
      elem: '#test5'
      ,url: '../upload' //改成您自己的上传接口
      ,accept: 'video'
      ,size:1024*150
      ,data: {path:$("#path").val()}
      ,progress: function(n, elem){
        var percent = n + '%' //获取进度百分比
        element.progress('demo', percent); //可配合 layui 进度条元素使用

        //以下系 layui 2.5.6 新增
       // console.log(elem); //得到当前触发的元素 DOM 对象。可通过该元素定义的属性值匹配到对应的进度条。
      }
      ,done: function(res){
        console.log(res)
        layer.msg('上传成功');
       
      },error:function(error){
        layer.msg(error)
      }
    });
    
    })
$("#sub").on("click", () => {


    var sex = $('input[name="gender"]:checked').val();
    function getSex() {
        if (sex == undefined || sex == '' || sex == null) {
            swal("Sorry!",'性别未填写无法提交', "error")
            return false
        }
        return true
    }
    //体验课
    var data = $('input:checkbox[name="yuyan"]:checked').map(function () {
        return $(this).val();
    }).get().join(",");
    if (getName() && getUserID() && getEngName() && getJapenName() && getNum1() && getNum2() && getSchool() && getHome() && getYearNuber() && getSkyepID() && getYear() && yuyanfun(data) && zheng1() && zheng2() && getSex()  && getterData() && getterDatatow()) {
        var sss = $("#BlANkID option:selected")

        var terdata = {
            Name: $("#Name").val(),
            NameID: $("#UserID").val(),
            EngID: $("#EngName").val(),
            JanpenName: $("#JapenName").val(),
            Blanknum: $("#Blank-num1").val(),
            Blanktit: $("#Blank-num2").val(),
            BlankID: sss.val(),
            School: $("#School").val(),
            Home: $("#Home").val(),
            yearHome: $("#yearHome").val(),
            SkypeID: $("#SkyepID").val(),
            WeixinID: $("#WeixinID").val(),
            yearData: $("#getYear").val(),
            Sex: sex,
            Phpne: $("#Phone").val(),
            Lesson: data,
            treHeader: $("#terHeader").val(),
            terData: $("#terData").val(),
            terData2: $("#terData2").val(),
            moeny1: $("#zheng2").val(),
            moeny2: $("#zheng1").val(),  
            xianzaizhiye: $("#xianzaizhiye").val(),
            chushengdi: $("#chushengdi").val(),
            kouzuofanhao: $("#kouzuofanhao").val(),
            renID: $("#renID").val(),
            telID: $("#telID").val(),
            kouzuomin: $("#kouzuomin").val(),
            zhidian:$("#zhidian").val()
        }
        console.log(terdata)
        $.ajax({
            url: AjaxUrl + "dataUpload",
            type: "post",
            data: JSON.stringify(terdata),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: ((d) => {
                console.log(d)
                if (d.stats == 1) {
                    swal("你好"+$("#Name").val(),'资料提交成功', "success")
                    
                } else {
                    swal("Error!",'服务器在紧急处理', "error")

                }
            })

        })
    }

})
$(() => {
    $.ajax({
        url: AjaxUrl + "isfirst",
        type: "get",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: (d) => {
            if (d.status == 1) {
                $.ajax({
                    url: AjaxUrl + "userinfo",
                    type: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: (data) => {
                        var img = AjaxUrl + 'upload/'
                        var das = data.Lesson.split(",")
                        var Lesson = $(".checkbox-inline>input")
                        for (let i = 0; i < das.length; i++) {
                            switch (das[i]) {
                                case '1':
                                    Lesson[0].setAttribute("checked", "checked")
                                    break
                                case '2':
                                    Lesson[1].setAttribute("checked", "checked")
                                    break
                                case '3':
                                    Lesson[2].setAttribute("checked", "checked")
                                    break
                                case '4':
                                    Lesson[3].setAttribute("checked", "checked")
                                    break
                            }
                        }
                        $("#Name").val(data.Name)
                        $("#UserID").val(data.NameID)
                        $("#EngName").val(data.EngID)
                        $("#JapenName").val(data.JanpenName)
                        $("#BlankID").val(data.BlankID)
                        $("#Phone").val(data.Phpne)
                        $("#School").val(data.School)
                        $("#Home").val(data.Home)
                        $("#yearHome").val(data.yearHome)
                        $("#SkyepID").val(data.SkypeID.replace(/&#145;/g, "'"))
                        $("#WeixinID").val(data.WeixinID)
                        $("#getYear").val(data.yearData)
                        $("#demo1").attr("src", img + data.ImgUrl)
                        $("#terData").val(data.terData.replace(/&#145;/g, "'"))
                        $("#terData2").val(data.terData2.replace(/&#145;/g, "'"))
                        $("#terHeader").val(data.treHeader)
                        $("#Blank-num1").val(data.Blanknum)
                        $("#Blank-num2").val(data.Blanktit)
                        $("#xianzaizhiye").val(data.xianzaizhiye)
                        $("#chushengdi").val(data.chushengdi)
                        $("#kouzuomin").val(data.kouzuomin)
                        $("#renID").val(data.renID)
                        $("#telID").val(data.telID)
                        $("#zhidian").val(data.zhidian)
                        $("#kouzuofanhao").val(data.kouzuofanhao)
                        $("#BlANkID>option").each(function () {
                            if ($(this).val() == data.BlankID) {
                                $(this).attr('selected', 'selected');
                                $(this).siblings().removeAttr('selected', "selected");
                            }
                        })
                        switch (data.Grade) {
                            case 1:
                                $("#zheng1").val("598")
                                $("#zheng2").val("198")
                                $("#zheng1").attr("disabled", "true")
                                $("#zheng2").attr("disabled", "true")
                                break;
                            case 2:
                                $("#zheng1").val("850")
                                $("#zheng2").val("198")
                                $("#zheng1").attr("disabled", "true")
                                $("#zheng2").attr("disabled", "true")
                                break
                            default:
                                $("#zheng1").val(data.moeny1)
                                $("#zheng2").val(data.moeny2)
                        }
                        if (data.Sex == '男') {
                            $("#nan").attr("checked", 'checked')
                        } else {
                            $("#nv").attr("checked", 'checked')
                        }

                    }
                })
            } else {
                $.ajax({
                    url: AjaxUrl + "userinfo",
                    type: "get",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: (data) => {
                        console.log(data)
                        switch (data.Grade) {
                            case 1:
                                $("#zheng1").val("598")
                                $("#zheng2").val("198")
                                $("#zheng1").attr("disabled", "true")
                                $("#zheng2").attr("disabled", "true")
                                break;
                            case 2:
                                $("#zheng1").val("850")
                                $("#zheng2").val("198")
                                $("#zheng1").attr("disabled", "true")
                                $("#zheng2").attr("disabled", "true")
                                break
                            default:
                                $("#zheng1").val(data.moeny1)
                                $("#zheng2").val(data.moeny2)
                        }
                    }
                })
            }

        }
    })
})

