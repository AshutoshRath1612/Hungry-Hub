const express = require('express');
const router = express.Router();
const foodController = require('../controller/FoodController');


// Route to create a new food item
router.post('/', foodController.createFood);

// Route to get all food items
router.get('/', foodController.getAllFoods);


// Route to get a specific food item by shopName
router.get('/shopName/:shopName', foodController.getFoodByShopName);

// Route to get a specific food item by name
router.get('/name/:name', foodController.getFoodByName);

// Route to update a specific food item by ID
router.put('/foods/:id', foodController.updateFoodById);

// Route to delete a specific food item by ID
router.delete('/foods/:id', foodController.deleteFoodById);

module.exports = router;
