const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// Route to create a new order
router.post('/orders', async (req, res) => {
  try {
    console.log(req.body)
    const { userId, items, totalPrice } = req.body;
    const newOrder = new Order({ userId, items, totalPrice });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'regdNo'); // Populate user details
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get an order by ID
router.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('userId', 'regdNo'); // Populate user details
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete an order by ID
router.delete('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
