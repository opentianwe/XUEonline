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
      if (d == "微信支付") {
        layer.msg('微信支付还未开通....', { time: 3000, icon: 7 });
      } else if (d == '支付宝支付') {
        if (temp) {
          $.ajax({
            url: "../alipay?CommodityID=" + b,
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
            url: "../alipay?CommodityID=" + b,
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

      } else if (d == "PayPal支付") {
        var comstr = {
          CommodityID: b,
        }
        $.ajax({
          url: "../tocheckout",
          data: comstr,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          type: "post",
          dataType: "json",
          success: function (d) {
            if (d.state == 0) return layer.msg(d.msg, { icon: 2 })
            var str = `
              <div>税后总计收款:${d.Amountactuallypaid}</div>
              <div>原价:${d.integral}</div>
              <div>优惠价:${d.money}</div>
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
              layer.open({
                type: 2,
                title: 'PayPal 付款页面',
                shadeClose: true,
                shade: 0.8,
                area: ['70%', '90%'],
                content: '1.html?Moeny=' + b //iframe的url

              });
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