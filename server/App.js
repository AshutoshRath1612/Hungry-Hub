const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const cors = require('cors')
const socket = require('socket.io')

const authRoutes = require('./routes/AuthRoutes')
const foodRoutes = require('./routes/FoodRoutes');
const orderRoutes = require('./routes/orderRoutes')
const shopRoutes = require('./routes/ShopRoutes')
const searchRoutes = require('./routes/SearchRoutes')

const errorHandler = require('./errorHandler');

require('dotenv').config()

const app = express()
const server = http.createServer(app);
const io = socket(server)

app.use(express.json());
app.use(cors())

app.set('io', io);

//Routes
app.use('/auth',authRoutes)
app.use('/food', foodRoutes);
app.use('/shop',shopRoutes);
app.use('/search',searchRoutes);
app.use('/order', orderRoutes);

console.log(io.emit())
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



io.on('connection', (socket) => {
    console.log('Connected to Socket');
    socket.on('disconnect', () => {
        console.log('Disconnected from Socket');
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export io for use in other files
module.exports = { app, server, io };
