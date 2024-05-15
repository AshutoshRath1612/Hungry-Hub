const express = require('express');
const { getShopInfo } = require('../controller/ShopController');
const router = express.Router();

router.get('/shopInfo/:shopName', getShopInfo);


module.exports = router