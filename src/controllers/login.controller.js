const express=require("express")
const User=require("../models/user.model")
const Otp=require("../models/otp.model")
const otpgenertor=require("../utills/otpgenerator")
const router=express.Router()
const transporter=require("../configu/mail")
require("dotenv").config()

router.post("",async(req,res)=>{
    try {
        const login=await User.findOne({email:req.body.email})
        if(!login){
            return res.status(404).send("plaease use register email")
        }
        let isOtp=await Otp.findOne({email:req.body.email})
        let otp;
        if(!isOtp){
            otp=otpgenertor()
            await Otp.create({
                email:req.body.email,
                otp
            })
        }
        else{
            otp=isOtp.otp
        }
        
        if(otp){
            const htmlTemplate=`  <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registration Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        margin: 20px auto;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                    }
                    .content {
                        padding: 20px;
                    }
                    
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <h1>Hi ${req.body.email} Your Otp is <span>${otp}</span> </h1>            
                    </div>
                </div>
            </body>
            </html>`   
            const mailOption={
                from: {
                    name:process.env.REACT_APP_SENDER_NAME,
                    address:process.env.REACT_APP_EMAIL_USER
                },
                to: req.body.email, 
                subject: "OTP send for login Confirmation - Full stack program", 
                text: "OTP send for login Confirmation - Full stack program", 
                html: htmlTemplate, 
              }
              await transporter.sendMail(mailOption,(err,res)=>{
                if(err){
                    console.log(err);
                }
                else {
                    console.log('The email was sent successfully');
                }
              });
        }

        
        res.status(201).send({message:"Otp send"})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/verify",async(req,res)=>{
    let {email,otp}=req.body
    try {
        const login=await Otp.findOne({email})
        if(!login){
            return res.status(404).send("not found otp")
        }
        if(login.otp!=otp){
            return res.status(404).send("not found otp")
        }
        await Otp.findOneAndDelete({email})
        const user=await User.findOne({email}).lean().exec()
        res.status(200).send({user,verify:true})
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports=router