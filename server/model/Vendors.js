const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  uniqueId: {
    type: Number,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  isStudent: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Vendors', VendorSchema);
