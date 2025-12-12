const nodemailer = require("nodemailer");

const sendMails=async(options)=>{
  
  try{
const transpotor=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.SMTP_Admin_Mail,
    pass:process.env.SMTP_AdMin_PASS
  }
})
const mailOptions={
  from:process.env.SMTP_Admin_Mail,
  to:options.to,
  subject:options.subject,
  html:options.html
};

await transpotor.sendMail(mailOptions);
console.log("mail is sent successfully");
  }catch(err){
    console.log("Something went wrong while sending the mail",err);
  }


}
module.exports =sendMails;