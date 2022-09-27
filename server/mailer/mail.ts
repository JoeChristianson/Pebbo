const nodemailer = require("nodemailer")

function sendEmail(){

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'pebboman@gmail.com',
        pass: 'PebboMan2022'
    }
});

let mailOptions = {
    from: '"xxx" <xxx@gmail.com>',
    to: 'yyy@gmail.com',
    subject: 'Teste Templete ✔',
    html: "Working"
};

transporter.sendMail(mailOptions).then((res) => {
  console.log(res)}).catch((e) => {console.log(e)});

console.log("This is not working!");

  // try{

  //   const transporter = nodemailer.createTransport({

  //     service: 'zoho',
  //     auth: {
  //       user: 'inventoryplus@zohomail.com',
  //       pass: 'Carmen2022'
  //     }
  //   });

  //   console.log(transporter);
    
    
  //   const mailOptions = {
  //     from: 'inventoryplus@zohomail.com',
  //     to: 'jcfargond@gmail.com',
  //     subject: 'Sending Email using Node.js',
  //     text: 'That was easy!'
  //   };
    
  //   // console.log("sending mail");
  //   transporter.sendMail(mailOptions, function(error, info){
  //     console.log("MAILING!");
      
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  // }catch(err){
  //   console.error(err)
  // }
  }
  
  
  module.exports = {sendEmail}