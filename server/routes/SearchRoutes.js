const express = require('express');
const { searchByKeyword, searchFoodByTypeAndCategory} = require('../controller/SearchController');
const router = express.Router();



// Route to search for food items by keyword
router.get('/search/:keyword',searchByKeyword);


// Route to search food items by type and category
router.get('/search', searchFoodByTypeAndCategory);


module.exports = router