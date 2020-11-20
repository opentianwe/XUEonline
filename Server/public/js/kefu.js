function Kefu(Obj) {
  console.log("");
  var cssStyle = `
            <style>
            @media screen and (min-width:769px){.kefubox{position:fixed;right:10px;z-index:99999;transform:translateY(300px);}.kefubox .main{width:50px;background:#fff;border:1px solid #f2f2f2;box-shadow:0 0 15px #e4e4e4;box-sizing:border-box;}.kefubox .cursor_default{cursor:default;}.kefubox .floor{border-bottom:1px solid #f2f2f2;position:relative;box-sizing:border-box;}.kefubox .floor .home{background-image:url("data:image/svg+xml;utf8,%3Csvg%20t%3D%221586946606115%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221943%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cpath%20d%3D%22M896%20832H128V490.666667L512%20128l384%20362.666667z%22%20fill%3D%22%23E8EAF6%22%20p-id%3D%221944%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M832%20448l-106.666667-106.666667V192h106.666667zM128%20832h768v106.666667H128z%22%20fill%3D%22%23C5CAE9%22%20p-id%3D%221945%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M512%2091.733333L85.333333%20488.533333l42.666667%2046.933334L512%20179.2l384%20356.266667%2042.666667-46.933334z%22%20fill%3D%22%23B71C1C%22%20p-id%3D%221946%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M384%20597.333333h256v341.333334H384z%22%20fill%3D%22%23D84315%22%20p-id%3D%221947%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M448%20362.666667h128v128h-128z%22%20fill%3D%22%2301579B%22%20p-id%3D%221948%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M586.666667%20757.333333c-6.4%200-10.666667%204.266667-10.666667%2010.666667v42.666667c0%206.4%204.266667%2010.666667%2010.666667%2010.666666s10.666667-4.266667%2010.666666-10.666666v-42.666667c0-6.4-4.266667-10.666667-10.666666-10.666667z%22%20fill%3D%22%23FF8A65%22%20p-id%3D%221949%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");}.kefubox .floor .tellink{background-image:url("data:image/svg+xml;utf8,%3Csvg%20t%3D%221586947302970%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222086%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cpath%20d%3D%22M187.6%20245.3l152.9%20152.9-27.9%2027.9c-5.7%205.7-6.3%2014.9-1.2%2021.2l26.5%2033.5c29.9%2037.8%2062.4%2074.3%2096.7%20108.6s70.8%2066.8%20108.6%2096.7l33.5%2026.5c6.4%205%2015.5%204.5%2021.2-1.2l27.9-27.9%20152.9%20152.9-56.2%2056.2c-2.2-1.1-4.3-2.1-6.4-3.2C591.8%20826.6%20478.4%20744.5%20379%20645c-99.4-99.4-181.6-212.8-244.3-337.1-1.1-2.1-2.2-4.3-3.2-6.4l56.1-56.2m0-83.9c-4.1%200-8.2%201.6-11.3%204.7L78%20264.4c-14.4%2014.4-18.2%2036.5-9.3%2054.9%202.9%205.9%205.8%2011.7%208.7%2017.6C141.7%20464.4%20227.1%20584%20333.6%20690.5s226.1%20191.9%20353.6%20256.2c5.8%202.9%2011.7%205.8%2017.6%208.7%206.7%203.2%2013.8%204.8%2020.9%204.8%2012.5%200%2024.8-4.9%2034-14.1l98.3-98.3c6.2-6.2%206.2-16.4%200-22.6l-220.9-221c-3.1-3.1-7.2-4.7-11.3-4.7s-8.2%201.6-11.3%204.7l-21.6%2021.6c-5.8%205.8-15%206.3-21.4%201.1-31.7-25.7-62.3-53.3-91.8-82.7-29.4-29.4-57-60.1-82.7-91.8-5.2-6.4-4.7-15.6%201.1-21.4l21.6-21.6c6.2-6.2%206.2-16.4%200-22.6L199%20166.1c-3.2-3.2-7.3-4.7-11.4-4.7z%22%20fill%3D%22%233E3A39%22%20p-id%3D%222087%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M444.1%20362.5L223.3%20141.7c-6.2-6.2-6.2-16.4%200-22.6l50.4-50.4c6.2-6.2%2016.4-6.2%2022.6%200l220.8%20220.8c6.2%206.2%206.2%2016.4%200%2022.6l-50.4%2050.4c-6.2%206.3-16.3%206.3-22.6%200zM882.3%20800.7L661.5%20579.9c-6.2-6.2-6.2-16.4%200-22.6l50.4-50.4c6.2-6.2%2016.4-6.2%2022.6%200l220.8%20220.8c6.2%206.2%206.2%2016.4%200%2022.6l-50.4%2050.4c-6.2%206.2-16.4%206.2-22.6%200z%22%20fill%3D%22%23FF6E83%22%20p-id%3D%222088%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");}.kefubox .floor .qqlink{background-image:url("../img/sss.png");}.kefubox .floor .wechatimg{background-image:url("../img/b.png");}.kefubox .floor .erweimaimg{background-image:url("../img/ddd.png");}.kefubox .floor > div{transform:translateX(300px);}.kefubox .floor:hover div{transition:all 300ms linear;transform:translateX(0);}.kefubox .floor .absbox{position:absolute;right:48px;top:0px;z-index:3;}.kefubox .floor .back{box-shadow:0 0 15px #e4e4e4;height:50px;width:120px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#666;background:#fff;box-sizing:border-box;}.kefubox .floor .kftel{cursor:default;box-shadow:0 0 15px #e4e4e4;height:50px;font-weight:500;width:120px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#666;background:#fff;box-sizing:border-box;}.kefubox .floor .qq{box-shadow:0 0 15px #e4e4e4;height:50px;width:120px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#666;background:#fff;box-sizing:border-box;}.kefubox .floor .erweima{box-shadow:0 0 15px #e4e4e4;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;padding:15px;font-size:12px;color:#666;background:#fff;box-sizing:border-box;}.kefubox .floor .erweima img{width:170px;height:250px;}.kefubox .floor .erweima p{width:100px;padding:5px 0;display:flex;align-items:center;justify-content:center;font-size:12px;}.kefubox .floor > a{width:50px;height:50px;z-index:9999;background-position:center center;background-size:25px 25px;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;}.kefubox .floor > a:hover{transition:all 300ms linear;background-color:#e4e4e4;transform:scale(1.1);}.kefubox .floor > a img{height:25px;width:25px;display:block;}.kefubox .floor > a img:hover{transition:all 300ms linear;transform:scale(1.3);}.kefubox .floor:last-child{border-bottom:none;}}@media screen and (max-width:768px){.kefubox{position:fixed;right:2vw;top:45vh;z-index:99999}.kefubox .floor{display:none;}.kefubox .tel{box-shadow:0 0 5px #ddd;background-color:#fff;background-image:url("data:image/svg+xml;utf8,%3Csvg%20t%3D%221586947302970%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222086%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Cpath%20d%3D%22M187.6%20245.3l152.9%20152.9-27.9%2027.9c-5.7%205.7-6.3%2014.9-1.2%2021.2l26.5%2033.5c29.9%2037.8%2062.4%2074.3%2096.7%20108.6s70.8%2066.8%20108.6%2096.7l33.5%2026.5c6.4%205%2015.5%204.5%2021.2-1.2l27.9-27.9%20152.9%20152.9-56.2%2056.2c-2.2-1.1-4.3-2.1-6.4-3.2C591.8%20826.6%20478.4%20744.5%20379%20645c-99.4-99.4-181.6-212.8-244.3-337.1-1.1-2.1-2.2-4.3-3.2-6.4l56.1-56.2m0-83.9c-4.1%200-8.2%201.6-11.3%204.7L78%20264.4c-14.4%2014.4-18.2%2036.5-9.3%2054.9%202.9%205.9%205.8%2011.7%208.7%2017.6C141.7%20464.4%20227.1%20584%20333.6%20690.5s226.1%20191.9%20353.6%20256.2c5.8%202.9%2011.7%205.8%2017.6%208.7%206.7%203.2%2013.8%204.8%2020.9%204.8%2012.5%200%2024.8-4.9%2034-14.1l98.3-98.3c6.2-6.2%206.2-16.4%200-22.6l-220.9-221c-3.1-3.1-7.2-4.7-11.3-4.7s-8.2%201.6-11.3%204.7l-21.6%2021.6c-5.8%205.8-15%206.3-21.4%201.1-31.7-25.7-62.3-53.3-91.8-82.7-29.4-29.4-57-60.1-82.7-91.8-5.2-6.4-4.7-15.6%201.1-21.4l21.6-21.6c6.2-6.2%206.2-16.4%200-22.6L199%20166.1c-3.2-3.2-7.3-4.7-11.4-4.7z%22%20fill%3D%22%233E3A39%22%20p-id%3D%222087%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M444.1%20362.5L223.3%20141.7c-6.2-6.2-6.2-16.4%200-22.6l50.4-50.4c6.2-6.2%2016.4-6.2%2022.6%200l220.8%20220.8c6.2%206.2%206.2%2016.4%200%2022.6l-50.4%2050.4c-6.2%206.3-16.3%206.3-22.6%200zM882.3%20800.7L661.5%20579.9c-6.2-6.2-6.2-16.4%200-22.6l50.4-50.4c6.2-6.2%2016.4-6.2%2022.6%200l220.8%20220.8c6.2%206.2%206.2%2016.4%200%2022.6l-50.4%2050.4c-6.2%206.2-16.4%206.2-22.6%200z%22%20fill%3D%22%23FF6E83%22%20p-id%3D%222088%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");background-size:6vw 6vw;background-repeat:no-repeat;background-position:center center;display:flex;}.kefubox .tel:active{background-color:#f2f2f2;}.kefubox .tel .kftel{display:none;}}
            
            </style>`;

  if (Obj.wechatPerson.state == true) {
    var wechatPerson =
      '<div class="floor">' +
      '                <a href="javascript:;" class="wechatimg cursor_default" >' +
      "                </a>" +
      '                <div class="absbox">' +
      '                    <div class="erweima">' +
      '                        <img src="' +
      Obj.wechatPerson.imgURL +
      '" alt="">' +
      "                        <p>WeCate</p>" +
      "                    </div>" +
      "                </div>" +
      "            </div>";
  } else {
    var wechatPerson = "";
  }

  if (Obj.wechatofficial.state == true) {
    var wechatofficial =
      '<div class="floor">' +
      '                <a href="javascript:;" class="erweimaimg cursor_default" >' +
      "                </a>" +
      '                <div class="absbox">' +
      '                    <div class="erweima">' +
      '                        <img src="' +
      Obj.wechatofficial.imgURL +
      '" alt="">' +
      "                        <p>管理員skype ID</p>" +
      "                    </div></div>";
  } else {
    var wechatofficial = "";
  }

  var kefuHtml =
    '<div class="kefubox">' +
    '        <div class="main">' +
    '            <div class="floor">' +
    '                <a href="' +
    Obj.index +
    '"  class="home">' +
    "                </a>" +
    '                <div class="absbox">' +
    "                    <div class=\"back\"><a href='./index.html'>" +
    "                        返回首页" +
    "                    </a></div>" +
    "                </div>" +
    "            </div>" +
    '            <div class="floor">' +
    '                <a href="' +
    "#" +
    +
    "&amp;site=qq&amp;menu=yes" +
    '"  class="qqlink" >' +
    "                </a>" +
    '                <div class="absbox">' +
    '                    <div class="erweima"><img src="./img/dasda.jpg"></div>' +
    "                </div>" +
    "            </div>" +
    wechatPerson +
    wechatofficial +
    "            </div>" +
    "        </div>" +
    "    </div>";

  document
    .getElementsByTagName("body")[0]
    .insertAdjacentHTML("afterbegin", cssStyle + kefuHtml);
}
var kefu = new Kefu({
  index: "./index.html",
  tel: "暂无", //电话号码
  wechatPerson: {
    state: true, // true是开启个人微信二维码, false不开启
    imgURL: "./img/569d7f542977ce4256135abe23f6dc3.jpg",
  },
  wechatofficial: {
    state: true, // true是开启微信公众号二维码, false不开启
    imgURL: "./img/4a3372abbaf4a5ae95b4e7aaeb01d11.png",
  }, //微信公众号
});
