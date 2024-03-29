let PayPalstr = window.location.search
let PayNum = PayPalstr.split("")
let payNum2;
if (PayNum.length == 9) {
    payNum2 = PayNum[7] + PayNum[8].toString()
} else {
    payNum2 = PayNum[7]
}
var button = document.querySelector('#submit-button');
var token = document.querySelector('#token')
console.log(token.innerHTML)
braintree.dropin.create({
    authorization: token.innerHTML,
    container: '#dropin-container'
}, function (createErr, instance) {
    button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
            payload.CommodityID = payNum2
            if (payload.nonce != undefined && payload.nonce != '') {
                $.ajax({
                    beforeSend: function () {
                        ShowDiv();
                    },
                    complete: function () {
                        HiddenDiv()
                    },
                    url: '../checkout'
                    , type: "post",
                    data: payload,
                    success: function (data) {
                        if (data.status == 1) {
                            layer.closeAll('iframe')
                            layer.confirm('支払い完了', {
                                btn: ['MY PAGEに移動', '現在のページにとどまる'] //按钮
                            }, function () {
                                layer.msg('ジャンプ中', { icon: 1, time: 2000 }, function () {
                                    window.location.href = './personal.html';
                                });
                            }, function () {
                                layer.msg('MY PAGEでポイントの確認ができる')
                            });
                            //layer.msg(data.msg, { icon: 1 })
                            //付款成功
                            //重定向到个人资料页面
                        } else {
                            layer.msg(data.msg, { icon: 2 })
                        }
                    }
                })

            }

        });
    });
});

function ShowDiv() {
    //0代表加载的风格，支持0-2
    //loading层

    layer.msg('決済中、しばらくお待ちください。...', {
        icon: 16,
        shade: 0.7,
        time: 100 * 10000
    });

}
function HiddenDiv() {
    console.log('执行完毕')
}