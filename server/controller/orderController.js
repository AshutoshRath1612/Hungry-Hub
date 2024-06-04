const { Expo } = require('expo-server-sdk');
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const Payment = require("../model/Payment");
const Shop = require("../model/Shop");
const User = require("../model/Users");
const Order = require("../model/Order");

const expo = new Expo();

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

    res.status(500).json({
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

    const dailyOrderNumber = highestOrder ? highestOrder.orderNo + 1 : 1;
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
      notes: cartData.notes
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

    res.status(500).json({
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
  const io = req.app.get("io");
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: status },
      { new: true } // This option returns the updated document
    );

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", isSuccess: false });
    }

    const user = await User.findById(order.userId);
    if (!user || !user.expoPushToken) {
      res.status(400).send("User push token not found");
      return;
    }

    // Send a notification to the user
    const message = `Your food is ${status}`;
    await sendPushNotification(user.expoPushToken, message);

    // Emit an event to notify clients about the order status update
    io.emit("orderStatusUpdate", { orderId, status });

    res
      .status(200)
      .json({ message: "Order status updated successfully", isSuccess: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", isSuccess: false });
  }
};

const sendPushNotification = async (expoPushToken, message) => {
  const messages = [];
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    return;
  }
  messages.push({
    to: expoPushToken,
    sound: 'default',
    body: message,
    data: { message },
  });

  const chunks = expo.chunkPushNotifications(messages);
  console.log("Chunks", chunks)
  for (const chunk of chunks) {
    try {
      const receipts = await expo.sendPushNotificationsAsync(chunk);
      console.log("receipts", receipts);
    } catch (error) {
      console.error(error);
    }
  }
};

const todayOrder = async (req, res) => {
  const shopName = req.params.shopName;
  try {
    const shopDetails = await Shop.findOne({ name: shopName });
    if (!shopDetails) {
      res.status(404).json({ error: "Shop not found" });
    } else {
      let orders = await Order.find({
        shopId: shopDetails._id,
        createdDate: { $gte: new Date(new Date().toDateString()) },
      });
      let totalIncome = 0;
      orders.forEach((order) => {
        order.items.forEach((item) => {
          totalIncome += item.price * item.quantity;
        });
      });
      res.json({ totalOrders: orders.length, totalIncome: totalIncome });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get orders", details: error.message });
  }
};

const getMostOrder = async (req, res) => {
  const userId = req.params.id;

  try {
    const orders = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Filter by userId
      { $unwind: '$items' }, // Deconstruct the items array field
      { $group: { _id: '$items.name', count: { $sum: '$items.quantity' } } }, // Group by item name and sum quantities
      { $sort: { count: -1 } }, // Sort by count in descending order
      { $limit: 5 }, // Limit to top 5 items
      { $project: { _id: 0, itemName: '$_id', count: 1 } } // Project the required fields
    ]);

    console.log('Aggregated orders:', orders); // Debugging: log the result

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  addOrder,
  getUserOrders,
  getCurrentOrders,
  getAllOrders,
  todayOrder,
  getMostOrder,
  updateOrderStatus,
};
