const express = require('express');
const router = express.Router();
const foodController = require('../controller/FoodController');
const Food = require('../model/Food'); // Import the Food model

// Route to create a new food item
router.post('/', foodController.createFood);

// Route to get all food items
router.get('/', foodController.getAllFoods);

// Route to get food recommendations for a specific food item by ID
router.get('/recommendations/:id', foodController.getRecommandations);

// Route to get a specific food item by shopName
router.get('/shopName/:shopName', foodController.getFoodByShopName);

// Route to get a specific food item by name
router.get('/name/:name/:type?', foodController.getFoodByName);

// Route to search for food items by keyword
router.get('/search/:keyword', async (req, res) => {
  const { keyword } = req.params;
  
  try {
    // Perform a case-insensitive search for food items containing the keyword in their name
    const foods = await Food.find({ name: { $regex: new RegExp(keyword, 'i') } });

    if (foods.length === 0) {
      return res.status(404).json({ message: 'No food items found matching the keyword' });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error('Error searching for food items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // New route to get shop information by shopName
// router.get('/shopInfo/:shopName', foodController.getShopInfo);

// Route to get food items in a particular shop by shopName
router.get('/shopInfo/:shopName', foodController.getShopInfo);


// // Route to get food items by category (e.g., "Vegetarian")
// router.get('/category/:category', foodController.getFoodByCategory);

// Route to search food items by type and category
router.get('/search', foodController.searchFoodByTypeAndCategory);

// Route to update a specific food item by ID
router.put('/:id', foodController.updateFoodById);

// Route to delete a specific food item by ID
router.delete('/:id', foodController.deleteFoodById);

module.exports = router;
