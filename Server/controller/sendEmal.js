const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    host:'smtp.126.com',
    secure:true,
    port:465,
    auth:{
        user:'haominjiaoyu@126.com',
        pass:'QOBJHSIVRLXHTQWB'
    }
})

// 设置电子邮件数据
let mailOptions = {
    from: '"XUEonline" <haominjiaoyu@126.com>', // 发件人邮箱
    to: "1206047095@qq.com", // 收件人列表，多个逗号隔开
    subject: "see you again!", // 标题
    text: "html" // html 内容
};

smtpTransport.sendMail(mailOptions, (error, info = {}) => {
    if (error) {
        console.log(error);
        //sendNodeMail(); // 再次发送
    }
    console.log("邮件发送成功", info.messageId);
    console.log("静等下一次发送");
});
