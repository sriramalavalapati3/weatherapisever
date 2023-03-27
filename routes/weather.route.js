const express=require("express");
const axios=require("axios")
const wroute=express.Router();
const {logger}=require("../logger/logger")
const {client}=require("../redis/redis");
const {limiter}=require("../limiter")
const {hismodel}=require("../model/hitory")
wroute.get("/city",async(req,response)=>{

    try {
      let flag=await client.hExists("data",req.body.city ) 
    //   console.log(flag)
      if(flag==true)
      {
        let dataa=await client.hGet("data",req.body.city)
        dataa=JSON.parse(dataa);
        
        res.send(dataaa)
      }else{
        let City=req.body.city;
        console.log(city)
        let res= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=399510e8618bcdbecf2f724f95cf3119`)
       
      let cord=res.data.coord;
      let weather=res.data.weather;
      
      let {main}=res.data.main
let details=res.data.sys;
let city=res.data.name
let data1={cord,weather,main,details,city}

data1=JSON.stringify(data1)
const mongodata=new hismodel(data1);
mongodata.save()
 await client.hSetNX("data",name,data1);
 logger.log("info","data processed")
        response.send(data1)
      }
        
    } catch (error) {
       response.send(error.message) 
       logger.log("error","posting data")
    }
})
module.exports={wroute}
