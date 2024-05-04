const Order = require('../model/Order');

// Controller function to get order history for a specific user
const getOrderHistory = async (req, res) => {
  const userId = req.params.userId; // Assuming userId is passed in the request params

  try {
    // Retrieve all orders associated with the user from the database
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No order history found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new order
const createOrder = async (req, res) => {
  const { userId, items, totalPrice } = req.body;

  try {
    // Create a new order instance
    const order = new Order({ userId, items, totalPrice });

    // Save the order to the database
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to cancel an existing order
const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getOrderHistory,
  createOrder,
  cancelOrder
};
