const express=require("express")
const connect=require("./configu/db.js")
const registerController=require("./controllers/user.controller.js")
const loginController=require("./controllers/login.controller.js")
const app=express()
const cors = require('cors');

require("dotenv").config()
app.use(cors());
app.use(express.json())
// app.use("/register",registerController)
// app.use("/login",loginController)
app.get("/abc",async(req,res)=>{
    res.json({"mess":"Hello World"})
})


(async ()=>{
    await connect()
    console.log(`server is connecting to`)
})()
module.exports=app
// app.listen(process.env.REACT_APP_PORT,async()=>{
//     try {
//         await connect()
//         console.log(`server is connecting to ${process.env.REACT_APP_PORT}`)
//     } catch (error) {
//         console.log("Error",error)
//     }
// })