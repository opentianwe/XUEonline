$(function () {
  function userTimeStr(t) {
    var newDate = new Date();
    var Dateyear = newDate.getMonth() + 1;
    var Datedata = newDate.getDate();
    Dateyear >= 10 ? (Dateyear = Dateyear) : (Dateyear = "0" + Dateyear);
    var Datefull = newDate.getFullYear();
    var Datehouse = newDate.getHours();
    var Dateminut = newDate.getMinutes();
    Datehouse >= 10 ? (Datehouse = Datehouse) : (Datehouse = "0" + Datehouse);
    Dateminut >= 10 ? (Dateminut = Dateminut) : (Dateminut = "0" + Dateminut);
    if (t) {
      return (str =
        Datefull +
        "-" +
        Dateyear +
        "-" +
        Datedata +
        "  " +
        Datehouse +
        ":" +
        Dateminut);
    } else {
      Datedata < 10 ? (Datedata = "0" + Datedata) : (Datedata = Datedata);
      return (str = Datefull + "-" + Dateyear + "-" + Datedata);
    }
  }
  function isTisDay(dayOne, dayTow) {
    let a, b, c, d;
    a = new Date(dayOne);
    b = new Date(dayTow);
    c = a.getTime();
    d = b.getTime();

    if (c == d) return true;
    return false;
  }
  function time_aa(data1, data2) {
    data1 = new Date(data1);
    data2 = new Date(data2);

    var date3 = data2.getTime() - parseInt(data1.getTime() - 1500000); //时间差的毫秒数
    if (date3 == 0) return true;
    console.log(date3);
    console.log(data1.getTime());
    console.log(data2.getTime());
    var subMinutes = Math.floor(date3 / (60 * 1000)); //获取总共的分钟差

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    console.log(" 剩余 " + days + "天 " + hours + "小时 " + minutes + " 分钟");

    if (days >= 0) {
      return false;
    } else if (days < 0) {
      return true;
    }
  }
  function isAjax(url, time, text1, text2, s) {
    var newTime = {
      Time: time,
      Text: text1,
      Text2: text2,
      classhour: s,
    };
    var pr = new Promise(function (res, rej) {
      $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(newTime),
        dataType: "json",
        success: function (data) {
          if (data.status == 1) {
            res(data.msg);
          } else {
            res("数据校检失败");
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
    return pr;
  }
  function getDuration(my_time) {
    var days = my_time / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    var hours = my_time / 1000 / 60 / 60 - 24 * daysRound;
    var hoursRound = Math.floor(hours);
    var minutes = my_time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
    var minutesRound = Math.floor(minutes);
    var seconds =
      my_time / 1000 -
      24 * 60 * 60 * daysRound -
      60 * 60 * hoursRound -
      60 * minutesRound;
    if (daysRound > 0) {
      return (time =
        daysRound + "日" + (hoursRound) + "時" + minutesRound + "分");
    } else if (hoursRound > 0) {
      return ((time = hoursRound) + "時" + minutesRound + "分");
    } else if (minutesRound > 0) {
      return (time = 00 + "時" + minutesRound + "分");
    } else {
      return (time = "0時");
    }
  }
  function isDate(timeOne, timeTow, temp) {
    var ti = new Date(timeOne);
    var t2 = new Date(timeTow);
    var tt1 = ti.getTime();
    var tt2 = t2.getTime();
    let res = tt2 - tt1;
    console.log(res)
    if (temp == true) {
      if (res > 0) {
        res = getDuration(res);
        //layer.msg("分後に授業開始" + res, { icon: 1 });
        // console.log(res)
        return res;
      } else {
        // layer.msg(
        //   "予約時間が過ぎました！先生と連絡をとれない場合， XUEサポート管理員に連絡してください",
        //   { icon: 2 }
        // );
        return -1;
      }
    } else {
      if (res > 0) return 1;
      return -1;
    }
  }
  var tobody = document.querySelector("#userTale");
  $("#userTale>tr> .timeApp").each(function () {
    var temp = isDate(getjdTime(), $(this).html(), false);
    if (temp != -1) {
      $(this).css("background", "#67C23A");
      $(this).css("color", "#fff");
      $(this).parent().attr("data-temp", "0");
    } else {
      $(this).css("background", "#909399");
      $(this).parent().attr("data-temp", "1");
    }
    console.log(getjdTime().substring(0, 10))
    if (isTisDay(getjdTime().substring(0, 10), $(this).html().substring(0, 10))) {
      $(this).css("background", "#2d8cf0");
      $(this).css("color", "#fff");
      $(this).css("font-weight", "600");
    }
  });
  $("#userTale>tr>.time").each(function () {
    //console.log($(this).siblings()[0].innerHTML);
    // console.log(getjdTime())
    var temp = isDate(getjdTime(), $(this).siblings()[0].innerHTML, true);
    temp == -1 ? temp = "授業済み" : temp = temp

    $(this).html("<strong>" + temp + "</strong>")

  })
  function getjdTime() {
    let time
    $.ajax({
      type: "get",
      url: "/getime",
      dataType: "json",
      async: false,
      //取消 异步  
      success: function (response) {
        if (response.Time == '' || response.Time == undefined) time = false
        time = response.Time
      }
    });
    return time
  }
  //console.log(getjdTime())

  // console.log(str.length)
  // console.log(str)
  function isTerDate(timeOne, timeTow) {
    let a, b, c, d
    a = new Date(timeOne)
    b = new Date(timeTow)
    c = a - b
    console.log(c)
    if (c < 0) return false
    if (c >= 7200000) return true
    return false

  }
  tobody.addEventListener("click", (e) => {
    var strTime;
    //console.log('1')

    if (e.target.className == "timeApp") {
      strTime = e.target.innerHTML;
      isDate(getjdTime(), e.target.innerHTML, true);
    }
    if (e.target.className == "layui-btn Studate") {
      var eleMent = e.target.parentElement.parentElement.childNodes
      var terstatus = e.target.parentElement.parentElement.getAttribute("data-id")
      var terDate = eleMent[0].innerHTML;
      var TerStr = `
      <div>订单信息</div>
      <div>講師:${eleMent[1].innerHTML}</div>
      <div>レッスン日時: ${eleMent[0].innerHTML}</div>
      <div>返還Point:${eleMent[4].innerHTML} <div>
      <strong>退款机制只退还积分</strong>
      `
      layer.confirm(TerStr, {
        btn: ['確認する', 'キャンセル'],
        title: "取消订单",
        closeBtn: false
        , shade: 0.8
      }, function () {

        if (isTerDate(terDate, getjdTime())) {
          // 执行满足预约操作
          $.ajax({
            type: "post",
            dataType: "json",
            data: JSON.stringify({ Time: terDate, id: terstatus }),
            url: "../cancel",
            success: function (d) {
              if (d.status == 2) {

                layer.msg(d.msg, {
                  icon: 1,
                })
                e.target.parentElement.parentElement.remove();
              }
              if (d.status == 1) {
                layer.msg(d.msg, {
                  icon: 2,
                })
              }
              if (d.status == 0) {
                layer.msg(d.msg, {
                  icon: 2,
                })
              }
              if (d.status == 3) {
                layer.msg(d.msg, {
                  icon: 2,
                })
              }
              console.log(d)
            }, error: function (error) {
              console.log(error)
            }
          })
        } else {
          layer.msg('授業済みなので、キャンセルできません', {
            icon: 2,
          })
          // 超过两小时 不可以取消预约
        }
      }, function () {
        console.log('退出退款操作')
      });

    } else if (e.target.className == "layui-btn Historyview") {
      var eleMent = e.target.parentElement.parentElement.childNodes
      var terstatus = e.target.parentElement.parentElement.getAttribute("data-id")
      $.ajax({
        url: "../getStudentreviews",
        type: "post",
        data: JSON.stringify({ id: terstatus }),
        success: function (res) {
          if (res.status == 0) {
            return layer.msg(res.msg, { icon: 2 })
          }
          if (res == false) return layer.msg("学生暂无评价", { icon: 1, })
          console.log(res)
          var a = ``
          // 反转数组 最新评论在上面
          res = res.reverse()
          console.log(res)
          for (let i = 0; i < res.length; i++) {
            a += `
           <tr class="isTimes"><td>${res[i].Pmsg}</td><td>${res[i].UserName}</td></tr>
        `
          }
          let b = `
          <table class="isTable" >
            <thead><tr ><th>评论内容</th><th>学生姓名</th></tr></thead>
            <tbody>${a}</tdody>
           </table>
          `
          layer.confirm(b, {
            area: ["55vw", "500px"],
            btn: ["确认查看"],
            closeBtn: false,
            shade: 0.8,

          }, function () {
            layer.closeAll();

          })
        },
        error: function (error) {

        }
      })


    } else if (e.target.className == 'layui-btn privateEvaluation') {
      var eleMent = e.target.parentElement.parentElement.childNodes
      var terstatus = e.target.parentElement.parentElement.getAttribute("data-id")
      $.ajax({
        url: "../getprivateEvaluation",
        type: "post",
        data: JSON.stringify({ ID: terstatus }),
        success: function (res) {
          console.log(res)
          var a = ``
          for (let i = 0; i < res.length; i++) {
            res[i].Text2 == null ? res[i].Text2 = '暂无评价' : res[i].Text2 = res[i].Text2
            res[i].Leseon == "undefined" ? res[i].Leseon = "暂无课程信息" : res[i].Leseon = res[i].Leseon

            a += `
           <tr class="TLeseon" >
           <td>${res[i].TeacherName}</td>
           <td>${res[i].Leseon}</td>
           <td>${res[i].Text2}</td>
           <td>${res[i].timeApp}</td>
           </tr>
        `
          }
          let b = `
          <table class="isTable" >
            <thead><tr><th>教师姓名</th><th>课程信息</th><th>老师评价</th><th>课程时间</th></tr></thead>
            <tbody>${a}</tdody>
           </table>
          `
          layer.confirm(b, {
            area: ["55vw", "aout"],
            btn: ["确认查看"],
            closeBtn: false,
            shade: 0.8,

          }, function () {
            layer.closeAll();

          })
        }, error: function (error) {
          console.log(error)
        }
      })
    } else
      if (e.target.className == "layui-btn Teachertit") {
        //  var temp = isDate(userTimeStr(), $('Teachertit').html(), false)
        let arr = [];
        let tdParent = e.target.parentElement.parentElement;
        let Nodelists = tdParent.childNodes;
        arr = [...arr, ...Nodelists];
        var stu = {
          Time: arr[0].innerHTML,
        };
        // console.log(!time_aa('2020-09-28  09:25', arr[0].innerHTML))
        if (!time_aa(getjdTime(), arr[0].innerHTML)) {
          return layer.msg("予約時間の25分後にコメントしてください", {
            closeBtn: 0,
            anim: 6, //动画类型
            icon: 2,
          });
        }
        $.ajax({
          type: "post",
          url: "../getstudentEvaluation",
          datatype: "json",
          data: JSON.stringify(stu),
          xhrFields: {
            withCredentials: true,
          },
          crossDomain: true,
          success: function (d) {
            var str = `
                <h4 class='teruser'>先生へのメッセージ<h4>
                <div>
                <textarea name="" id="terText" placeholder="200字以内にご入力ください" maxlength="200" cols="30" rows="5"></textarea>
                </div>
               `;
            var msg = d.msg;
            if (d.status == 0) {
              layer.confirm(
                str,
                {
                  area: ["55vw", "400px"],
                  btn: ["確認する", "キャンセル"],
                  title: "", //按钮
                  closeBtn: false,
                  shade: 0.8,
                },
                function () {
                  if ($("#terText").val() == "") {
                    return layer.msg("先生へのコメントをお願いします", {
                      icon: 2,
                    });
                  }
                  // layer.msg(arr[1] + '老师评价成功', { icon: 1, })
                  var userData = {
                    Time: arr[0].innerHTML,
                    text: $("#terText").val(),
                  };
                  $.ajax({
                    type: "post",
                    datatype: "json",
                    url: "../studentEvaluation",
                    data: JSON.stringify(userData),
                    xhrFields: {
                      withCredentials: true,
                    },
                    crossDomain: true,
                    success: (d) => {
                      if (d.status == 0) {
                        return layer.msg(d.msg, { icon: 2 });
                      } else if (d.status == 1) {
                        return layer.msg(d.msg, { icon: 1 });
                      } else if (d.status == 164) {
                        return layer.msg(d.msg, { icon: 2 });
                      }
                    },
                    error: function (error) {
                      layer.msg(error, { icon: 2 });
                    },
                  });
                  return arr;
                  //console.log(arr[2] + '\n' + $('#terText').val())
                  //这里清空数组因为他指向的是全局变量 arr上面的数组 for循环里面有push 方法通过push 方法每执行一次 就要清空数组
                },
                function () {
                  layer.msg("大好きな先生にメッセージを送ってください", {
                    icon: 6,
                  });
                }
              );
            } else if (d.status == 1) {
              layer.msg(
                "已经评价过了无法进行二次评价如果想查看评价请从查看评论模块查看",
                { icon: 6 }
              );
              // layer.confirm(str, {
              //     area: ['55vw', '400px'],
              //     btn: ['確認します', '後で確認します'],
              //     title: "查看 " + arr[1].innerHTML + '老师的评价', //按钮
              //     closeBtn: false
              //     , shade: 0.8
              // }, function () {
              //     layer.msg('この先生に気になったら、続けてご予約をお願いします', { icon: 6, });
              //     //这里清空数组因为他指向的是全局变量 arr上面的数组 for循环里面有push 方法通过push 方法每执行一次 就要清空数组
              // }, function () {
              //     layer.msg('大好きな先生にメッセージを送ってください', { icon: 6, });
              // })
              // $('#terText').attr("disabled", "disabled")
              // $('#terText').val(msg + '\nリマインド:(先生に評価をしました、二度目の評価はできません）')
            }
          },
          error: (error) => {
            layer.msg(error, { icon: 2 });
          },
        });
      } else if (e.target.className == "layui-btn Studtit") {
        let arr = [];
        let tdParent = e.target.parentElement.parentElement;
        let Nodelists = tdParent.childNodes;
        arr = [...arr, ...Nodelists];
        var dt = {
          Time: arr[0].innerHTML,
        };
        if (!time_aa(getjdTime(), arr[0].innerHTML)) {
          return layer.msg("予約時間の25分後にコメントしてください", {
            closeBtn: 0,
            anim: 6, //动画类型
            icon: 2,
          });
        }
        var jpstr = Number(arr[0].innerHTML.substring(12, 14)) + 1;
        jpstr >= 10 ? (jpstr = jpstr) : (jpstr = "0" + jpstr);
        var jptime = arr[0].innerHTML.replace(
          arr[0].innerHTML.substring(12, 14),
          jpstr
        );
        var str = `
            <h4 class='teruser'>レッスンの内容(上课内容)<h4>
            <div>予約時間${arr[0].innerHTML}（中国時間）</div>
            <div>予約時間${jptime}（日本時間）</div>\
            <div>岑博豪生徒さんへのメッセージです。
            <br>
             例：谢谢你预约我的课，希望下次见到你。</div>
            <div>
            <textarea name="" class='op1' disabled id="terText" placeholder="200字以内にご入力ください" maxlength="200" cols="10" rows="2"></textarea>
            <br>
            <p>レッスン時間(请在上课26分钟以后进行评价，之前不可以评价，评价才可以得到积分)</p>
            <select name="" id="stusdata" >
            <option class='op' selected='selected' value="0">0分</option>
            <option class='op' value="25">25分</option>
            </select>
            <div>   
            <p><strong>下面是以便分享和了解学生的信息，只有老师们可以看到，学生们看不到。</strong></p>
            <textarea name="" class='op1' disabled id="terText2"  placeholder="200字以内にご入力ください" maxlength="200" cols="10" rows="2"></textarea>
            </div>
            </div>
           `;
        $.ajax({
          type: "post",
          url: "../geteacherEvaluation",
          data: JSON.stringify(dt),
          dataType: "json",
          success: function (response) {
            if (response.status == 1) {
              layer.confirm(
                str,
                {
                  area: ["55vw", "aout"],
                  btn: ["確認する", "キャンセル(取消)"],
                  title: "对 " + arr[1].innerHTML + "生徒さんのコメント", //按钮
                  closeBtn: false,
                  shade: 0.8,
                },
                function () {
                  if ($("#terText").val() == "") {
                    return layer.msg("評価必須(レッスン内容)", { icon: 3 });
                  }

                  var options = document.querySelectorAll(".op");
                  let isval;
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      isval = options[i].value;
                    }
                  }
                  console.log(isval);
                  isAjax(
                    "../teacherEvaluation",
                    arr[0].innerHTML,
                    $("#terText").val(),
                    $("#terText2").val(),
                    isval
                  ).then(
                    function (val) {
                      layer.msg(arr[1].innerHTML + "コメントを送りました", {
                        icon: 1,
                      });
                    },
                    function (er) {
                      layer.msg(arr[1].innerHTML + "コメントを送っていません", {
                        icon: 2,
                      });
                    }
                  );
                },
                function () {
                  layer.msg(
                    "リマインド：生徒さんへのコメントをしないと、ポイントを加算できません",
                    { icon: 8 }
                  );
                }
              );

              var stusdata = document.getElementById("stusdata");
              var op = document.querySelectorAll(".op");
              stusdata.addEventListener("change", function () {
                for (let index = 0; index < op.length; index++) {
                  if (op[index].selected) {
                    if (op[index].value == "0") {
                      $(".op1").each(function () {
                        $(this).attr("disabled", "disabled");
                      });
                    } else {
                      $(".op1").each(function () {
                        $(this).removeAttr("disabled");
                      });
                    }
                  }
                }
              });
            } else if (response.status == 3) {
              layer.msg("已经评价过,本次积分结算完毕", {
                closeBtn: 0,
                anim: 5, //动画类型
                icon: 1,
              });
              //layer.msg('已经评价过了无法进行二次评价如果想查看评价请从查看评论模块查看', { icon: 6, });
              // layer.confirm(str, {
              //     area: ['55vw', 'aout'],
              //     btn: ['確認します', '後で確認します'],
              //     title: "对 " + arr[1].innerHTML + '生徒さんのコメント', //按钮
              //     closeBtn: false
              //     , shade: 0.8
              // }, function () {
              //     if ($('#terText').val() == '') {
              //         return layer.msg('評価必須(レッスン内容)', { icon: 3, });
              //     }
              //     layer.msg(arr[1].innerHTML + '情報を確認する', { icon: 1, })
              //     //这里清空数组因为他指向的是全局变量 arr上面的数组 for循环里面有push 方法通过push 方法每执行一次 就要清空数组
              // }, function () {
              //     layer.msg('ログアウトしました', { icon: 8, });
              // })
              // $('#terText').val(response.Evaluation)
              // $('#terText2').val(response.onEvaluation)
            }
          },
        });
        //结束
      }
  });

  /**
   *  ----表格操作-----
   *  isAdd 查看全部表格操作
   *  isnotAdd 未预约
   *  isAddter 已经预约
   * 实例化一个控制表格对象 通过三个原型方法
   */
  function ControlTable(ArrayList) {
    this.ArrayList = ArrayList;
    this.ArrayList = [...this.ArrayList];
  }
  ControlTable.prototype.SetAddTable = function () {
    this.ArrayList.map((item) => {
      item.getAttribute("data-temp") == 1
        ? (item.className = "")
        : (item.className = "");
    });
  };
  ControlTable.prototype.SetAddRemoveTable = function () {
    this.ArrayList.map((item) => {
      item.getAttribute("data-temp") == 1
        ? (item.className = "list-n")
        : (item.className = "");
    });
  };
  ControlTable.prototype.SetAddRemoveTowTable = function () {
    this.ArrayList.map((item) => {
      item.getAttribute("data-temp") != 1
        ? (item.className = "list-n")
        : (item.className = "");
    });
  };
  let GetStaus = document.querySelector(".yuyue");
  let Settr = document.querySelectorAll("#userTale>tr");
  $(".yuyue>span").each(function () {
    $(this).on("click", () => {
      $(this).addClass("active").siblings().removeClass("active");
    });
  });
  GetStaus.addEventListener("click", function (e) {
    let SetA = new ControlTable(Settr);
    switch (e.target.className) {
      case "isnotAdd active":
        SetA.SetAddRemoveTable();
        break;
      case "isAddter active":
        SetA.SetAddRemoveTowTable();
        break;
      default:
        SetA.SetAddTable();
        break;
    }
  });
});
