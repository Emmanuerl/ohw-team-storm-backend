const nodemailer = require('nodemailer');
const handlebars= require("handlebars");
const fs = require("fs");
const config= require("config");
const {Logger} = require("./logger");
const AdminMail=""//config.get("MailerEmail")
const AdminPassword =""//config.get("MailerPassword")

async function SendHbsEmail(HbsFilePath,HbsData,receiverMail,subject){
fs.readFile(HbsFilePath,(error,data)=>{
    if(error){
        Logger.error("Could not find Hbs file",error)
        return
    }
    var Handlebarsfile= handlebars.compile(data.toString())
    var handlebarsGeneratedHtml=Handlebarsfile({HbsData});
    SendMail(receiverMail,handlebarsGeneratedHtml,subject);
});
}

async function SendTextEmail (receiverMail,text,subject)
{
    await SendMail(receiverMail,text,subject)       
}

async function SendMail(receiver,text,subject){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: AdminMail ,
            pass:AdminPassword
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
        });
    
        let mailOptions = {
            from: AdminMail,
            to: receiver,
            subject: subject,
            html: text
            };
    
        transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                Logger.error("Email failed to send",error)
                return
                }else{
                    Logger.info("sent",res)
                }

                });

}

var Mailer = {SendTextEmail,SendHbsEmail}

module.exports = Mailer