const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { createOrder } = require('../controller/orderController');

router.post('/create_order',createOrder)

module.exports = router;
