const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    uniqueId:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    isStudent:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Vendors', VendorSchema)