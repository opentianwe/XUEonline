const nodemailer = require('nodemailer')


function sendMail(from,aliasName,tos,subject,msg)
{
    const smtpTransport = nodemailer.createTestAccount({
        host:'smtp.126.com',
        secure:true,
        port:465,
        auth:{
            user:from,
            pass:'QOBJHSIVRLXHTQWB'
        }
        
    })
}