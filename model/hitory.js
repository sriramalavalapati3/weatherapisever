const mongoose=require("mongoose");

const hisSchema=mongoose.Schema({
    cord:String,weather:String,main:String,details:String,city:String
})

const hismodel=mongoose.model("user",hisSchema)
module.exports={hismodel}