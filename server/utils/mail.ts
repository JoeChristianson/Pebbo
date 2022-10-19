const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()


const mailer = async ({email,html,text,subject})=>{
    const smtpTransport = nodemailer.createTransport({
        sendMail:true,
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth:{
            user:process.env.SEND_IN_BLUE_USERNAME,
            pass:process.env.SEND_IN_BLUE_PASSWORD
        }
    })
    const sendResult = await smtpTransport.sendMail({
            from: "pebboman@gmail.com",
            to: email,
            subject,
            text,
            html
        })
    return sendResult    
}
module.exports = mailer