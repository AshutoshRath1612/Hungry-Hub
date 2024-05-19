const express = require('express');
const { searchFood} = require('../controller/SearchController');
const router = express.Router();


// Route to search food items by type and category
router.get('/', searchFood);


module.exports = router