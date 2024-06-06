const mongoose=require("mongoose")

const connect=()=>{
    // return mongoose.connect("mongodb+srv://sayli555:sayli555@cluster0.9tsnrae.mongodb.net/eligere")
    return mongoose.connect("mongodb+srv://sayli555:sayli555@cluster0.9tsnrae.mongodb.net/eligere?retryWrites=true&w=majority&appName=Cluster0")
}
module.exports=connect

