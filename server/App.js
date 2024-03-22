const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/AuthRoutes')

require('dotenv').config()

const app = express()

app.use(express.json());

app.use('/auth',authRoutes)

app.use((err,req,res,next) => {
    const errorstatus = err.status || 500;
    const errormessage = err.message || "Something went wrong";
    res.status(errorstatus).json({
        success: false,
        status:errorstatus,
        message:errormessage,
        stack:err.stack,
    })
})

 mongoose.connect(process.env.MONGO).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT , async()=>{
    console.log("Server Running at",process.env.PORT)
    
})