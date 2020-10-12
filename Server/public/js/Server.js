function setData(time, state, ID) {
    switch (Number(state)) {
        case 0: state = 1; break
        case 1: state = 2; break
        case 2: state = 0; break
        default: state = 0
    }
    var postdata = {
        status: state,
        time: time
    }
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', './setData', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
    httpRequest.send(JSON.stringify(postdata));//发送请求 将json写入send中

    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var json = httpRequest.responseText;//获取到服务端返回的数据
            if (JSON.parse(json).status == 0) {
                console.log()
                switch (Number(state)) {
                    case 0: ID.parentNode.innerHTML = '<td onclick="setData(\'' + String(time) + '\',\'' + state + '\', ' + ID.id + ')" id="' + ID.id + '">_</td>'; break
                    case 1: ID.parentNode.innerHTML = '<td onclick="setData(\'' + String(time) + '\',\'' + state + '\',' + ID.id + ')" id="' + ID.id + '"><span style="background-color:#ffdddd;">OPEN</span></td>'; break
                    case 2: ID.parentNode.innerHTML = '<td onclick="setData(\'' + String(time) + '\',\'' + state + '\',' + ID.id + ');" id="' + ID.id + '"><span style="background-color:#cccccc;">CLOSE</span></td>'; break
                }
            }
        }
    };
}
function makeAnapp(ID, time, bID) {
    $.ajax({
        type: "POST",
        url: "./makeAnapp",
        data: JSON.stringify({ ID: ID, Time: time }),
        dataType: "json",
        success: function (res) {
            console.log(res)
            if (res.isSpecialOffer) {
                var text = '尊敬的顾客你好,您是第一支付预约,可享受XUE官方给您提供的优惠活动'
            } else {
                text = ' '
            }
            var str = `
               <div class='lay-tit-box'>
               <h4>确认付款信息</h4>
               <div>预约教师姓名:<span>${res.Name}</span></div>
               <div>预约时间:<span>${res.Time}</span></div>
               <div>系统提示:<strong>(中日时差一个小时 系统采用默认时间为日本时间 例如日本时间7:00 等于 中国时间 6:00)</strong></div>
               <div>预约成功后，可直接通过系统给你提供的信息联系老师</div>
               <div>付款金额:<span>${res.moeny}积分</span></div>
               <div>${text}</div>
               <div>
               <h4>给老师的留言，例如，我要学习的是教科书22课17页，请不要使用日语。</h4>
               <input type="radio" class="tval" name="t" value="汉语" >汉语
               <input type="radio" class="tval" name="t" value="日语" >日语
               <input type="radio" class="tval" name="t" value="英语" >英语
               <input type="radio" class="tval" name="t" value="韩语" >韩语
                <strong>上课内容请选择</strong>
               <br>
               <textarea name="" id="textval" cols="90" rows="4" class="border"></textarea>
               </div>
               <div>如对付款有任何疑惑或一些不解可以查看<a href='./titMoeny.html' target="_blank">用户支付条例</a></div>
               </div>
            `
            if (res.status === 0) {
                layer.confirm(str, {
                    area: ['55vw', '700px'],
                    btn: ['付款', '取消付款'],
                    title: "购买积分", //按钮
                    closeBtn: false
                    , shade: 0.8
                }, function () {
                    if (!navigator.onLine) {
                        e.stopPropagation();
                        layer.msg('网络未连接，请检查重试', { time: 3000, icon: 5 });
                        return;
                    }
                    var Leseon = $('input[name="t"]:checked').val()
                    if (Leseon == undefined) return layer.msg('请选择要学习的课程', { time: 3000, icon: 2 });
                    var Textval = $('#textval').val()
                    // 先发一个ajax 请求 然后在  根据ajax  
                    $.ajax({
                        type: "post",
                        url: "./pay",
                        async: true,
                        beforeSend: function () {
                            ShowDiv();
                        },
                        complete: function () {
                            HiddenDiv();
                        },
                        data: JSON.stringify({ ID: ID, Time: time }),
                        dataType: 'json',
                        success: function (res) {

                            layer.close(index)
                            if (res.status === 0) {
                                bID.parentNode.innerHTML = '<td bgcolor="#ffffff"><span style="background-color:#ddffff;">予約済</span></td>'
                                layer.confirm('付款成功', {
                                    btn: ['查看老师信息', '稍后查看'],
                                    title: "付款完成",
                                    icon: 1,
                                    area: ['30vw', '300px'], closeBtn: false, shade: 0.8
                                }, function () {
                                    if (!navigator.onLine) {
                                        e.stopPropagation();
                                        layer.msg('网络未连接，请检查重试', { time: 3000, icon: 5 });
                                        return;
                                    }
                                    layer.msg('正在跳转', { icon: 1, time: 2000 }, function () {
                                        console.log('执行跳转操作')
                                        window.location.href = './personal.html'
                                    })
                                    //回调1
                                }, function () {
                                    layer.msg('退出后可从个人中心查看预约信息', { icon: 6, })
                                });
                            } else if (res.status === 10) {
                                layer.msg(res.msg)
                            } else if (res.status === 2) {
                                layer.msg(res.msg)
                            } else if (res.status === 5) {
                                layer.msg(res.msg)
                            } else if (res.status === 6) {
                                layer.msg(res.msg)
                            } else if (res.status === 12) {
                                layer.msg(res.msg)
                            } else if (res.status === 244) {
                                layer.msg(res.msg)
                            }
                        }

                    });


                }, function () {
                    layer.msg('欢迎下次在来', { icon: 6, });
                });
            } else if (res.status === 4) {
                layer.msg(res.msg)
            } else if (res.status === 1) {
                layer.msg(res.msg)
            } else if (res.status === 3) {
                layer.msg(res.msg)
            }
        }, error: function (error) {
            layer.msg(error)
        }
    });

    // var httpRequest = new XMLHttpRequest()

    // httpRequest.open('POST','./makeAnapp',true)
    // httpRequest.setRequestHeader("Content-type","application/json")
    // httpRequest.send(JSON.stringify({ID:ID,Time:time}))

    // httpRequest.onreadystatechang = function(){
    //     if(httpRequest.readyState == 4 && httpRequest.status == 200)
    //     {
    //         jsons = httpRequest.responseText
    //         alert(JSON.parse(jsons))


    //     }
    // }



}
var index
function ShowDiv() {
    //0代表加载的风格，支持0-2
    //loading层

    layer.msg('正在付款请勿关闭页面，请耐心等候...', {
        icon: 16,
        shade: 0.7,
        time: 100 * 10000
    });

}
//隐藏加载数据
function HiddenDiv() {
}