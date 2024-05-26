const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: false
  },
  orderId: {
    type: String,
    required: true // Allow this to be optional for initial creation
  },
  signature: {
    type: String,
    required: false // Allow this to be optional for initial creation
  },
  status: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
