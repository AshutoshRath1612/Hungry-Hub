
const Food = require('../model/Food');

// Controller function to create a new food item
const createFood = async (req, res) => {
    try {
      const { shopName, name, price, category, type, isAvailable } = req.body;
      const food = new Food({ shopName, name, price, category, type, isAvailable });
      await food.save();
      res.status(201).json({message : `${name} added successfully`});
    } catch (error) {
      console.error('Error creating food item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Controller function to get all food items
const getAllFoods = async (req, res) => {
    try {
      // Retrieve all food items from the database
      const foods = await Food.find();
      res.status(200).json(foods);
    } catch (error) {
      console.error('Error fetching food items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


// Controller function to get a specific food item by name
const getFoodByName = async (req, res) => {
    const foodName = req.params.name;
  
    try {
      const food = await Food.findOne({ name: foodName });
  
      if (!food) {
        return res.status(404).json({ message: 'Food item not found' });
      }
  
      res.status(200).json(food);
    } catch (error) {
      console.error('Error fetching food item by name:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

// Controller function to get a specific food item by shopName
const getFoodByShopName = async (req, res) => {
    const shopName = req.params.shopName;
  
    try {
      const food = await Food.find({ shopName });
  
      if (!food) {
        return res.status(404).json({ message: 'Food item not found' });
      }
  
      res.status(200).json(food);
    } catch (error) {
      console.error('Error fetching food item by shopName:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



// Controller function to update a food item by ID
const updateFoodById = async (req, res) => {
    try {
      const { name, price, category, type, isAvailable } = req.body;
      const foodId = req.params.id;
  
      // Log the foodId to ensure it's being captured correctly
      console.log('Updating food with ID:', foodId);
  
      // Find the existing food item by its ID and update it
      const updatedFood = await Food.findByIdAndUpdate(
        foodId,
        { name, price, category, type, isAvailable },
        { new: true }
      );
  
      // Check if the updatedFood is null (i.e., not found)
      if (!updatedFood) {
        console.log('Food not found with ID:', foodId);
        return res.status(404).json({ message: 'Food not found' });
      }
  
      // Respond with the updated food item
      res.json(updatedFood);
    } catch (error) {
      // Log any error that occurred during the update operation
      console.error('Error updating food item by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getRecommandations = (req, res) => {
    const userId = req.params.userId;
const orders = [
    { userId: 1, item: 'A' },
    { userId: 1, item: 'B' },
    { userId: 2, item: 'A' },
    { userId: 2, item: 'C' },
    { userId: 3, item: 'B' },
    { userId: 3, item: 'C' },
];
  
const userOrders = orders.filter(order => order.userId === userId);

if (userOrders.length === 0) {
    // New user: Recommend most ordered items
    const itemCounts = {};
    orders.forEach(order => {
        itemCounts[order.item] = (itemCounts[order.item] || 0) + 1;
    });

    const mostOrderedItems = Object.keys(itemCounts)
        .sort((a, b) => itemCounts[b] - itemCounts[a])
        .slice(0, 3);
      res.status(200).json(mostOrderedItems);
  } else {
    // Existing user: Recommend based on past orders
    const userItems = userOrders.map(order => order.item);
    const recommendedItems = orders.filter(order => !userItems.includes(order.item))
        .map(order => order.item);


      res.status(200).json(recommendedItems);
  }
  }
  

// Controller function to delete a food item by ID
const deleteFoodById = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getRecommandations,
  getFoodByName,
  getFoodByShopName,
  updateFoodById,
  deleteFoodById
};