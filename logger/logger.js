const express=require("express");

const winston=require("winston");
// const expresswinston=require("express-winston");


const logger=winston.createLogger({
    level:"info",
    transports:[
        new winston.transports.File({
            filename: "errors.log",
            level: "error",
            timestamp:Date.now,
            // message: 'Incoming requests',
            // method: req.method,
            // url: req.url,
            // headers: req.headers
        }),
        new winston.transports.File({
            filename: "correct.log",
            level: "info",
            timestamp:Date.now,
            // message: 'Incoming requests',
            // method: req.method,
            // url: req.url,
            // headers: req.headers
        })
        

    ]
})
module.exports={logger}