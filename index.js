const express=require("express");
const app=express();
app.use(express.json())
const {connection}=require("./config/config")
const {rroute}=require("./routes/cred.route")
const {auth}=require("./middlewares/middleware");
const {wroute}=require("./routes/weather.route")
app.use("/cred",rroute)
app.use(auth)
app.use("/weath",wroute)
const {client}=require("./redis/redis")

app.listen(8080,async()=>{
    try {
        await connection
        console.log("server running at port no 8080")
    } catch (error) {
        console.log("error in server"+"\n"+error.message)
    }
})
