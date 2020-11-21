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
    httpRequest.open('POST', '../setData', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
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
        url: "../makeAnapp",
        data: JSON.stringify({ ID: ID, Time: time }),
        dataType: "json",
        success: function (res) {

            if (res.isSpecialOffer) {
                var text = '体験授業料は198円です。XUEonlineのプレゼントは初回登録までです'
            } else {
                text = ' '
            }
            var str = `
               <div class='lay-tit-box'>
               <h4>支払い情報を確認する</h4>
               <div>担当先生の名前:<span>${res.Name}</span></div>
               <div>予約時間:<span>${res.Time}</span></div>
               <div><strong>(中国と日本の時差は一時間です。XUEonlineのシステムは日本時間を表示しています。たとえば日本時間7：00＝中国時間6：00)</strong></div>
               <div>予約した後、担当先生のSkype或はWeChatまでにご連絡お願い致します</div>
               <div>決済金額:<span>${res.moeny}ポイント</span></div>
               <div>${text}</div>
               <div>
               <strong>希望するレッスン</strong>
               <input type="radio" class="tval" name="t" value="中国語" >中国語
               <input type="radio" class="tval" name="t" value="日本語" >日本語
               <input type="radio" class="tval" name="t" value="英語" >英語
               <input type="radio" class="tval" name="t" value="韓国語" >韓国語   
               <br>
               <h4>講師へメッセージ：例）XXテキスト第22課17ページ、日本語を使わないでください。</h4>
               <textarea name=""  style='border: 1px solid #000 !important;' id="textval" cols="90" rows="4" class="border"></textarea>
               </div>
               <div>支払いについて疑問や不明な点がある場合<a href='./titMoeny.html' target="_blank">  支払い規則を確認してください</a></div>
               </div>
            `
            if (res.status === 0) {
                layer.confirm(str, {
                    area: ['55vw', '700px'],
                    btn: ['購入する', 'キャンセル'],
                    title: "point購入", //按钮
                    closeBtn: false
                    , shade: 0.8
                }, function () {
                    if (!navigator.onLine) {
                        e.stopPropagation();
                        layer.msg('ネットワークが接続されていません。確認して再試行してください', { time: 3000, icon: 5 });
                        return;
                    }
                    var Leseon = $('input[name="t"]:checked').val()
                    if (Leseon == undefined) return layer.msg('ご予約したいレッスンを選んでください', { time: 3000, icon: 2 });
                    var Textval = $('#textval').val()
                    // 先发一个ajax 请求 然后在  根据ajax  
                    $.ajax({
                        type: "post",
                        url: "../pay",
                        async: true,
                        beforeSend: function () {
                            ShowDiv();
                        },
                        complete: function () {
                            HiddenDiv();
                        },
                        data: JSON.stringify({ ID: ID, Time: time, Leseon: Leseon, Textval: Textval }),
                        dataType: 'json',
                        success: function (res) {
                            layer.close(index)
                            console.log(res);
                            if (res.status === 0) {
                                bID.parentNode.innerHTML = '<td bgcolor="#ffffff"><span style="background-color:#ddffff;">予約済</span></td>'
                                layer.confirm('購入しました', {
                                    btn: ['先生の情報を確認します', '後で確認します'],
                                    title: "購入しました",
                                    icon: 1,
                                    area: ['30vw', '300px'], closeBtn: false, shade: 0.8
                                }, function () {
                                    if (!navigator.onLine) {
                                        e.stopPropagation();
                                        layer.msg('ネットワークが接続されていません。確認して再試行してください', { time: 3000, icon: 5 });
                                        return;
                                    }
                                    layer.msg('→ジャンぷ中', { icon: 1, time: 2000 }, function () {
                                        console.log('执行跳转操作')
                                        window.location.href = './personal.html'
                                    })
                                    //回调1
                                }, function () {
                                    layer.msg('MY　PAGEで予約情報を確認することができます', { icon: 6, })
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
                    layer.msg('まだお越しください', { icon: 6, });
                });
            } else if (res.status === 4) {
                layer.msg(res.msg)
                window.location.href = './logoin.html'
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