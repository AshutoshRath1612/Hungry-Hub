const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    shopName:{
        type:String,
        required:true,
       unique:false
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
       
    },
    category:{
        type:String,
        required:true,
        
    },
    type:{
        type:String,
        required:true,
        // default:Vegeterian
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    }
})

module.exports = mongoose.model("Food", FoodSchema) 