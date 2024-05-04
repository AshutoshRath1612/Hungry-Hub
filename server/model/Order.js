const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the Users model
    required: true
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
