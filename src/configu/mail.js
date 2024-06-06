const nodemailer = require("nodemailer");
require("dotenv").config()
console.log("process",process.env.REACT_APP_PORT)
module.exports = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "sayligiri555@gmail.com",
        pass: "nbrc uliq kypt awno"
    },
  });

 


//  module.exports=async(mailOption)=>{
//     try {
//         await transporter.sendMail(mailOption)
//         consle.log("mail is succesfully send")
//     } catch (error) {
//         console.log("error",error)
//     }
//   }

  

