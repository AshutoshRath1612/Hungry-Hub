const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { createOrder, addOrder, getUserOrders, getCurrentOrders, getAllOrders, updateOrderStatus } = require('../controller/orderController');

router.post('/create_order',createOrder)
router.post('/add_order',addOrder)

router.put('/update_status' , updateOrderStatus)

router.get('/user/:id' , getUserOrders)
router.get('/current/:shopName' , getCurrentOrders)
router.get('/all/:shopName' , getAllOrders)

module.exports = router;
