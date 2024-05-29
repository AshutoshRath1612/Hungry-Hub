const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the Users model
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shops model
    required: true
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment', // Reference to the Payment model
    required: false // Allow this to be optional for split bill feature
  },
  orderNo: {
    type: Number,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  orderType: {
    type: String,
    enum: ['Dine-in', 'Pickup'],
    required: true
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }
  ],
  notes: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Preparing', 'Prepared', 'Delivered'],
    default: 'Pending',
    required: true
  }
}, { timestamps: true });

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
