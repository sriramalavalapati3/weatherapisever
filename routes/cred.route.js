const express=require("express");
const rroute=express.Router();
const {logger}=require("../logger/logger")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {usermodel}=require("../model/user")
const {client}=require("../redis/redis")
require('dotenv').config()
//----->register route
rroute.post("/register",async(req,res)=>{
const {name,email,password}=req.body;
try {
    bcrypt.hash(password,4,async(err,hash)=>{
        if(!err){
            const data=new usermodel({name,email,password:hash})
            await data.save();
            logger.log("info","posting data")
            res.send("registeration succesfull")
              logger.log("info","posting data")
        }else{
            res.send(err.message +" "+"error in hasing")
        }
    })
} catch (error) {
   res.send(error.message +"error in registration") 
}
})

rroute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
    
        const user=await usermodel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, async(err, result)=>{
        if(result){
        const token = jwt.sign({userID:user._id},process.env.token,{expiresIn:"1000s"});
        const refresh=jwt.sign({userID:user._id},process.env.secret,{expiresIn:"5000s"});
        await client.set('token',`${token}`);
        await client.set('refreshtoken',`${refresh}`);
        console.log(token+"\n"+"refreshtoken:\n"+refresh)
        logger.log("info","login")
        res.send({"msg":"Login Successfull","token":token})
        } else {res.send("Wrong Credntials")}
        });
        } else {
        res.send("Wrong Credntials")
        }
        }
    catch (error) {
    res.send("Something went wrong")
    console.log(err)
    
    }
})

rroute.post("/logout",async(req,res)=>{
let token=await client.get("token")
await client.LPUSH("Token",token)

res.send("logout")
})

module.exports={rroute}