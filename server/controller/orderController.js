const Razorpay = require('razorpay');


const createOrder = async(req,res) => {
  const { amount, currency, receipt, payment_capture } = req.body;
  
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
  });
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency,
    receipt,
    payment_capture
  };

  try {
    const response = await razorpayInstance.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addOrder = (req,res) => {
  const { order, payment, cartData, user } = req.body;
  console.log(order, payment, cartData, user);
  res.json({ success: true });
}

module.exports = {
  createOrder,
  addOrder
};