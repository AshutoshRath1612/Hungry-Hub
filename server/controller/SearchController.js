const Food = require('../model/Food'); // Import the Food model


const searchByKeyword = async (req, res) => {
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
  }

  
// Controller function to search for food items by keyword (name)
const searchFoodByName = async (req, res) => {
    const keyword = req.params.keyword;
  
    try {
      // Use text search on 'name' field to find matching food items
      const foods = await Food.find({ $text: { $search: keyword } });
  
      if (foods.length === 0) {
        return res
          .status(404)
          .json({ message: `No food items found matching '${keyword}'` });
      }
  
      res.status(200).json(foods);
    } catch (error) {
      console.error("Error searching for food items by name:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Controller function to search food items by type and category
  const searchFoodByTypeAndCategory = async (req, res) => {
    const { type, category } = req.query;
  
    try {
      let query = {};
  
      // Build the MongoDB query based on provided parameters
      if (type && category) {
        query = {
          type: { $regex: new RegExp(type, "i") },
          category: { $regex: new RegExp(category, "i") },
        };
      } else if (type) {
        query = { type: { $regex: new RegExp(type, "i") } };
      } else if (category) {
        query = { category: { $regex: new RegExp(category, "i") } };
      }
  
      const foods = await Food.find(query);
  
      if (foods.length === 0) {
        const message = `No food items found matching type '${
          type || "Any"
        }' and category '${category || "Any"}'`;
        return res.status(404).json({ message });
      }
  
      res.status(200).json(foods);
    } catch (error) {
      console.error(
        "Error searching for food items by type and category:",
        error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  module.exports = {searchByKeyword,searchFoodByName,searchFoodByTypeAndCategory}