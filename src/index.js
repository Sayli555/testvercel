const express=require("express")
const mongoose=require("mongoose")
const app=express()
app.use(express.json())

app.get("/abc",async(req,res)=>{
    res.json({"mess":"Hello World"})
})

const connect=()=>{
    // return mongoose.connect("mongodb+srv://sayli555:sayli555@cluster0.9tsnrae.mongodb.net/eligere")
    return mongoose.connect("mongodb+srv://sayli555:sayli555@cluster0.9tsnrae.mongodb.net/eligere?retryWrites=true&w=majority&appName=Cluster0")
}
(async ()=>{
    await connect()
    console.log(`server is connecting to`)
})()
module.exports=app
