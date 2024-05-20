const express = require('express');
const { getShopInfo, getAllShop } = require('../controller/ShopController');
const router = express.Router();

router.get('/shopInfo/:shopName', getShopInfo);
router.get('/',getAllShop)


module.exports = router