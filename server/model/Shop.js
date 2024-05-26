const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true,
    default: 0
  },
  ratingCount: {
    type: Number,
    required: true,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);
