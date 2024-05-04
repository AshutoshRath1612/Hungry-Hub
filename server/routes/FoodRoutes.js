const express = require('express');
const router = express.Router();
const foodController = require('../controller/FoodController');


// Route to create a new food item
router.post('/foods', foodController.createFood);

// Route to get all food items
router.get('/foods', foodController.getAllFoods);

// // Route to get a specific food item by ID
// router.get('/foods/:id', foodController.getFoodById);

// Route to get a specific food item by shopName
router.get('/foods/shopName/:shopName', foodController.getFoodByShopName);

// Route to get a specific food item by name
router.get('/foods/name/:name', foodController.getFoodByName);

// Route to update a specific food item by ID
router.put('/foods/:id', foodController.updateFoodById);

// Route to delete a specific food item by ID
router.delete('/foods/:id', foodController.deleteFoodById);

module.exports = router;
