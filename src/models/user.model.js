const mongoose=require("mongoose")

const userRegisterSchema=new mongoose.Schema({
fullName:{type:String,require:true},
email:{type:String,require:true},
phoneNumber:{type:Number,require:true},
session:[{type:String,require:true}],
uniqueId:{type:String,require:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("user",userRegisterSchema)