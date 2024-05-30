const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const Payment = require("../model/Payment");
const Shop = require("../model/Shop");
const User = require("../model/Users");
const Order = require("../model/Order");

const createOrder = async (req, res) => {
  const { amount, currency, receipt, payment_capture } = req.body;

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: amount, // amount in the smallest currency unit
    currency,
    receipt,
    payment_capture,
  };

  try {
    const response = await razorpayInstance.orders.create(options);

    // Create a payment document in MongoDB
    const payment = new Payment({
      orderId: response.id, // Using Razorpay order ID
      status: "created", // Initial status
    });

    await payment.save();

    res.json(response);
  } catch (error) {
    // Handle Razorpay order creation failure
    console.error("Error creating Razorpay order:", error.message);

    // Create a payment document with 'failed' status
    const payment = new Payment({
      paymentId: null,
      status: "failed",
      errorMessage: error.message,
    });

    await payment.save();

    res
      .status(500)
      .json({
        error: "Failed to create Razorpay order",
        details: error.message,
      });
  }
};

const addOrder = async (req, res) => {
  const { order, payment, cartData, user } = req.body;
  try {
    // Update the payment document with additional details
    const paymentDoc = await Payment.findOne({
      orderId: payment.razorpay_order_id,
    });

    if (!paymentDoc) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    paymentDoc.paymentId = payment.razorpay_payment_id;
    paymentDoc.signature = payment.razorpay_signature;
    paymentDoc.status = "paid";

    await paymentDoc.save();

    // Get the current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split("T")[0];

    // Find the highest order number for today
    const highestOrder = await Order.findOne({
      createdDate: { $gte: new Date(currentDate) },
    }).sort({ orderNo: -1 });

    // Log the highest order found for debugging
    console.log("Highest order found:", highestOrder);

    const dailyOrderNumber = highestOrder ? highestOrder.orderNo + 1 : 1;
    console.log(dailyOrderNumber);
    // Create the order with the daily order number
    const orderData = new Order({
      userId: user._id,
      shopId: cartData.items[0].shopId,
      paymentId: paymentDoc._id,
      orderNo: dailyOrderNumber,
      orderId: order.id, // Combine date and daily order number
      orderType: cartData.deliveryType,
      items: cartData.items[0].items,
      status: "Pending",
    });

    await orderData.save();

    res.json({ success: true });
  } catch (error) {
    // Handle error in updating payment or creating order
    console.error("Error processing order:", error.message);

    // Update payment document to 'failed' status
    if (payment.razorpay_order_id) {
      const paymentDoc = await Payment.findOne({
        orderId: payment.razorpay_order_id,
      });
      if (paymentDoc) {
        paymentDoc.status = "failed";
        paymentDoc.errorMessage = error.message;
        await paymentDoc.save();
      }
    }

    res
      .status(500)
      .json({
        error: "Failed to process order",
        details: error.message,
        success: false,
      });
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.params.id;
  try {
    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch orders with user and shop details populated
    let orders = await Order.find({ userId: objectId })
      .populate("userId", "mobileNo") // Assuming User model has name and email fields
      .populate("shopId", "name") // Assuming Shop model has name and location fields
      .populate("paymentId", "paymentId signature status")
      .sort({ createdDate: -1 });

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get orders", details: error.message });
  }
};

const getCurrentOrders = async (req, res) => {
  const shopName = req.params.shopName;
  try {
    // Fetch orders with user and shop details populated
    const shopDetails = await Shop.findOne({ name: shopName });
    let orders = await Order.find({
      shopId: shopDetails._id,
      status: { $in: ["Pending", "Accepted", "Preparing", "Prepared"] },
    })
      .populate("userId", "regdNo mobileNo") // Assuming User model has name and email fields
      .populate("shopId", "name") // Assuming Shop model has name and location fields
      .populate("paymentId", "paymentId signature status")
      .sort({ createdDate: -1 });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get orders", details: error.message });
  }
};
const getAllOrders = async (req, res) => {
  const shopName = req.params.shopName;
  try {
    const shopDetails = await Shop.findOne({ name: shopName });
    if (!shopDetails) {
      return res.status(404).json({ error: "Shop not found" });
    }

    let orders = await Order.find({ shopId: shopDetails._id })
      .populate("userId", "regdNo mobileNo")
      .populate("shopId", "name")
      .populate("paymentId", "paymentId signature status")
      .sort({ createdDate: -1 });

    let sortedOrders = sortByDates(orders);
    res.json(sortedOrders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get orders", details: error.message });
  }
};

const sortByDates = (orders) => {
  let sorted = {};

  orders.forEach((order) => {
    let date = order.createdDate.toDateString();
    if (sorted[date]) {
      sorted[date].push(order);
    } else {
      sorted[date] = [order];
    }
  });

  // Transform the sorted object into an array of objects
  let result = Object.keys(sorted).map((date) => ({
    date: date,
    orders: sorted[date],
  }));

  return result;
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: status },
      { new: true } // This option returns the updated document
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" , isSuccess:false });
    }
    res.status(200).json({ message: "Order status updated successfully", isSuccess:true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error",isSuccess:false });
  }
};


module.exports = {
  createOrder,
  addOrder,
  getUserOrders,
  getCurrentOrders,
  getAllOrders,
  updateOrderStatus
};
