const Food = require("../model/Food");
const Shop = require("../model/Shop");
const {sortByShopAndCategory } = require("./SearchController");

// Controller function to create a new food item
const createFood = async (req, res) => {
  try {
    const { shopName, name, price, category, type, isAvailable } = req.body;
    const food = new Food({
      shopName,
      name,
      price,
      category,
      type,
      isAvailable,
    });
    await food.save();
    res.status(201).json({ message: `${name} added successfully` });
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all food items
const getAllFoods = async (req, res) => {
  try {
    // Retrieve all food items from the database
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get a specific food item by name
const getFoodByName = async (req, res) => {
  const foodName = req.params.name;

  try {
    const food = await Food.findOne({ name: foodName });

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food item by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get a specific food item by shopName
const getFoodByShopName = async (req, res) => {
  const shopName = req.params.shopName;
  try {
    let foods = await Food.find({ shopName });

    if (!foods || foods.length === 0) {
      return res
        .status(404)
        .json({ message: "No food items found for the shop" });
    }

    foods = sortByShopAndCategory(foods);

    let updatedFood = await Promise.all(
      foods.map(async (food) => {
        const shop = await Shop.findOne({ name: food.shopName });
        return {
          shop, // Set default value if shop is null
          categories: food.categories
        };
      })
    );
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Error fetching food items by shopName:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a food item by ID
const updateFoodById = async (req, res) => {
  try {
    const { name, price, category, type, isAvailable } = req.body;
    const foodId = req.params.id;

    // Log the foodId to ensure it's being captured correctly
    console.log("Updating food with ID:", foodId);

    // Find the existing food item by its ID and update it
    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      { name, price, category, type, isAvailable },
      { new: true }
    );

    // Check if the updatedFood is null (i.e., not found)
    if (!updatedFood) {
      console.log("Food not found with ID:", foodId);
      return res.status(404).json({ message: "Food not found" });
    } else {
      // Respond with the updated food item
      res.status(200).json({ message: `Food update Successfully` });
    }
  } catch (error) {
    // Log any error that occurred during the update operation
    console.error("Error updating food item by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller function to delete a food item by ID
const deleteFoodById = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodByName,
  getFoodByShopName,
  updateFoodById,
  deleteFoodById,
};
