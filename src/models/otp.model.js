const mongoose=require("mongoose")
const express=require("express")

const otpSchema=new mongoose.Schema({
email:{type: String,require:true},
otp:{type:Number,require:true}
}
,{
timestamps:true,
versionKey:false
}
)

const Otp=mongoose.model("otp",otpSchema)

module.exports=Otp