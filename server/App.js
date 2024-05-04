const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/AuthRoutes')
const foodRoutes = require('./routes/FoodRoutes');
const orderRoutes = require('./routes/orderRoutes')
const errorHandler = require('./errorHandler');

require('dotenv').config()

const app = express()

app.use(express.json());
app.use(cors())

//Routes
app.use('/auth',authRoutes)
app.use('/food', foodRoutes);
app.use('/order', orderRoutes);


// Error handling middleware
app.use(errorHandler);


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

//DB Connection
 mongoose.connect(process.env.MONGO).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT , async()=>{
    console.log("Server Running at",process.env.PORT)
    
})