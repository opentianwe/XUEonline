$(function () {
  function jisuan() {
    $("#moenys-left").html('你选择了 ' + $("#checked>span").html() + '  ==> 支付金额  ' + $("#getMoeny-val>.vip-moeny .moeny").html())
  }
  jisuan()
  $(".addss").each(function (index) {
    $(this).on("click", () => {
      $(this).attr('id', "checked");
      $(this).siblings().removeAttr('id', "checked");
      jisuan()
    })
  })
  $(".vip-content-moenycar>div").each(function (index, ele) {
    $(this).on("click", () => {
      $(this).addClass("acitve")
      $(this).attr('id', "getMoeny-val");
      $(this).siblings().removeClass("acitve");
      $(this).siblings().removeAttr('id', "getMoeny-val");
      jisuan()
    })
  })
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  $("#moneyBtn").on("click", () => {
    if ($("input[name='userTit']").is(':checked')) {
      var d = $("#checked>span").html();
      var a = $("#getMoeny-val>.vip-moeny .moeny").html();
      var c = $("#getMoeny-val>.vip-top .jifen").html();
      var b = $("#getMoeny-val").data("idmoney");
      console.log(b)
      var temp = IsPC()
      if (d == "WeChat") {
        layer.msg('微信支付还未开通....', { time: 3000, icon: 7 });
      } else if (d == 'Alipay') {
        if (temp) {
          $.ajax({
            url: "./alipay?CommodityID=" + b,
            type: "get",
            dataType: "json",
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (res) => {
              console.log(res)
              console.log()
              if (res.status == 0) {
                window.location.href = res.Url
              }

            }, error: (err) => {
              console.log(err)
            }
          })
        } else {
          $.ajax({
            url: "./alipay?CommodityID=" + b,
            type: "get",
            dataType: "json",
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (res) => {
              console.log(res)
              console.log()
              if (res.status == 0) {

                window.location.href = res.Url

              }

            }, error: (err) => {
              console.log(err)
            }
          })

        }

      } else if (d == "PayPal") {

        var comstr = {
          CommodityID: b,
        }
        $.ajax({
          url: "./tocheckout",
          data: comstr,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          type: "post",
          dataType: "json",
          success: function (d) {
            if (d.msg == 'Cookies校验失败!,请跳转到登录页') return window.location.href = './logoin.html'
            if (d.status == 0) return layer.msg(d.msg, { icon: 2 })
            if (d.state == 0) return layer.msg(d.msg, { icon: 2 })
            var str = `
            <div>买入积分:${d.integral}</div>
            <div>付款金额:${d.money}</div>
            <div>税后实际付款:${d.Amountactuallypaid}</div>
            <div>税率:${d.taxRate}</div>
             `
            layer.confirm(str, {
              area: ['55vw', 'aout'],
              btn: ['确认支付', '退出支付'],
              title: 'Paypal支付', //按钮
              closeBtn: false
              , shade: 0.8
              , anim: 3
            }, function () {
              layer.closeAll()
              $.ajax({
                // beforeSend: function () {
                //     ShowDiv();
                // },
                // complete: function () {
                //     HiddenDiv()
                // },
                url: './checkout'
                , type: "post",
                data: {CommodityID:1},
                success: function (data) {
                    if (data.status == 1) {
                        // layer.closeAll('iframe')
                        // layer.confirm('付款成功', {
                        //     btn: ['前往个人页面', '停留在本页面'] //按钮
                        // }, function () {

                        //     layer.msg('正在跳转', { icon: 1, time: 2000 }, function () {
                        //         console.log('执行跳转操作')
                        //         window.location.href = './personal.html'
                        //     })
                        // }, function () {
                        //     layer.msg('查看积分可从个人界面查看')
                        // });
                        // //layer.msg(data.msg, { icon: 1 })
                        // //付款成功
                        // //重定向到个人资料页面
                        window.location.href = data.Url
                    } else {
                        // layer.msg(data.msg, { icon: 2 })
                    }
                }
            })
            }
              , function () {

              })
          }, error: function (error) {
            layer.msg(error, { icon: 2 })
          }
        })


        //layer.msg('PayPal支付还未开通....', { time: 3000, icon: 7 });
      } else {
        layer.msg('支付出现问题', { time: 3000, icon: 5 });
      }
    } else {
      layer.msg('你未通过用户支付协议无法进行购买积分操作', { time: 3000, icon: 5 });
    }


  })
})