const User=require("../models/user.model.js")
const express=require("express")
const router=express.Router()
const transporter=require("../configu/mail")
require("dotenv").config()
router.post("",async(req,res)=>{ 
    try {
        let user;
        if(!req.body.fullName || !req.body.email || !req.body.session || !req.body.phoneNumber){
            return res.status(400).send({message:"please provide require information",flag:false})
        }
        user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).json({message:"please provide another email for new register",flag:false})
        }
        user=await User.create(req.body)
        // if(user){
        //     const htmlTemplate=`  <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <title>Registration Confirmation</title>
        //         <style>
        //             body {
        //                 font-family: Arial, sans-serif;
        //                 background-color: #f4f4f4;
        //                 margin: 0;
        //                 padding: 0;
        //             }
        //             .container {
        //                 background-color: #ffffff;
        //                 margin: 20px auto;
        //                 padding: 20px;
        //                 border-radius: 10px;
        //                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        //                 max-width: 600px;
        //             }
        //             .header {
        //                 text-align: center;
        //                 padding: 10px 0;
        //                 border-bottom: 1px solid #e4e4e4;
        //             }
        //             .content {
        //                 padding: 20px;
        //             }
        //             .footer {
        //                 text-align: center;
        //                 padding: 10px 0;
        //                 border-top: 1px solid #e4e4e4;
        //                 font-size: 12px;
        //                 color: #888888;
        //             }
        //             .alert-icon{
        //                 text-align: center;
        //                 width:100px
        //             }
        //         </style>
        //     </head>
        //     <body>
        //         <div class="container">
        //             <div class="header">
        //             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/768px-Eo_circle_green_white_checkmark.svg.png?20200417133735" alt="Alert Icon" class="alert-icon">
        //                 <h1>Registration Confirmation</h1>
        //             </div>
        //             <div class="content">
        //                 <p>Dear ${req.body.fullName},</p>
        //                 <p>Thank you for registering for Full stack Event . We are pleased to confirm your registration. Below are the details of your registration:</p>
        //                 <p><strong>Name:</strong> ${req.body.fullName}</p>
        //                 <p><strong>Email:</strong> ${req.body.email}</p>
        //                 <p><strong>Unique ID:</strong> ${req.body.uniqueId}</p>
        //                 <p><strong>Phone Number:</strong> ${req.body.phoneNumber}</p>
        //                 <p><strong>Selected Sessions:</strong> ${req.body.session}</p>
        //                 <p>We look forward to your participation. If you have any questions or need further assistance, please do not hesitate to contact us at ${process.env.EMAIL_USER}.</p>
        //             </div>
        //             <div class="footer">
        //                 <p>Best regards,</p>
        //                 <p>sayali</p>
        //             </div>
        //         </div>
        //     </body>
        //     </html>`   
        //     const mailOption={
        //         from: {
        //             name:process.env.REACT_APP_SENDER_NAME,
        //             address:process.env.REACT_APP_EMAIL_USER
        //         },
        //         to: req.body.email, 
        //         subject: "Registration Confirmation - Full stack program", 
        //         text: "Hello world?", 
        //         html: htmlTemplate, 
        //       }
        //       await transporter.sendMail(mailOption,(err,res)=>{
        //         if(err){
        //             console.log(err);
        //         }
        //         else {
        //             console.log('The email was sent successfully');
        //         }
        //       });
        // }
        return res.status(201).send({user,flag:true})
    } catch (error) {
         res.status(404).send({message:"Internal server error",flag:false})
    }
})
router.get("",async(req,res)=>{
    try {
        const user=await User.find().lean().exec()
        return res.status(201).send({user})
    } catch (error) {
         res.status(404).send(error)
    }
})
router.get("/:id",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).lean().exec()
        return res.status(201).send({user})
    } catch (error) {
         res.status(404).send(error)
    }
})
module.exports=router
