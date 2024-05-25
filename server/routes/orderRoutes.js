const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { createOrder, addOrder } = require('../controller/orderController');

router.post('/create_order',createOrder)
router.post('/add_order',addOrder)

module.exports = router;
