const express = require('express');
const router = express.Router();
const foodController = require('../controller/FoodController');


// Route to create a new food item
router.post('/', foodController.createFood);

// Route to get all food items
router.get('/', foodController.getAllFoods);


router.get('/recommendations/:id', foodController.getRecommandations);

// Route to get a specific food item by shopName
router.get('/shopName/:shopName', foodController.getFoodByShopName);

// Route to get a specific food item by name
router.get('/name/:name', foodController.getFoodByName);

// Route to update a specific food item by ID
router.put('/:id', foodController.updateFoodById);

// Route to delete a specific food item by ID
router.delete('/:id', foodController.deleteFoodById);

module.exports = router;
