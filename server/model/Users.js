const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    regdNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    isStudent:{
        type:Boolean,
        required:true,
        default:true
    }
})

module.exports = mongoose.model("Users", UserSchema) 