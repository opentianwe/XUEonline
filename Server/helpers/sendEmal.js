const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.126.com',
    secure: true,
    port: 465,
    auth: {
        user: 'haominjiaoyu@126.com',
        pass: 'QOBJHSIVRLXHTQWB'
    }
})



function sendEmalTeacher(toEmal,name,toname,time,isTeacher) {
    var text = ''
    if(isTeacher)
    {
        text = name + "先生\n\n\n\n" + toname + "\nレッスン予約が完了しました。\n" + "༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ \n" + "日本時間 :" + time +"\n༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ ༺ \n" + "ログイン後に、生徒さんの情報を確認できます。\n追加しておくとスムーズにレッスンを開始できます。\n何か困ったことがありましたら、些細でもお知らせください。"
        //+ time + "(东京时间与北京时间相差一个小时,请提前确认与查看以免延误课程)的课程,请前往XUE个人中心查看学生联系方式!" 
    }else
    {
        text =  name + "同学\n\n"  + "您预约了"+ toname +"老师在东京时间:" + time + "(东京时间与北京时间相差一个小时,请提前确认与查看以免延误课程)的课程,请前往XUE个人中心查看老师联系方式!"
    }

    let mailOptions = {
        from: '"XUEonline" <haominjiaoyu@126.com>', // 发件人邮箱
        to: toEmal, // 收件人列表，多个逗号隔开
        subject: "您有一条新的预约信息!", // 标题
        text: text // html 内容
    }
    smtpTransport.sendMail(mailOptions, (error, info = {}) => {
    });
}


exports.sendEmalTeacher = sendEmalTeacher