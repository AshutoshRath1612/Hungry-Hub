const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    shopName:{
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
    },
    ratings:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    }
})

FoodSchema.index({ shopName: 1 }, { unique: false });

module.exports = mongoose.model("Food", FoodSchema) 