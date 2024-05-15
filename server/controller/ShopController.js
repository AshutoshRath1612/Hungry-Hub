const Food = require('../model/Food'); // Import the Food model


// Controller function to get shop information by shopName
const getShopInfo = async (req, res) => {
    const shopName = req.params.shopName;
  
    try {
      // Find all food items with the specified shopName
      const shops = await Food.find({
        shopName: { $regex: new RegExp(shopName, "i") },
      });
  
      if (shops.length === 0) {
        return res.status(404).json({ message: `Shop '${shopName}' not found` });
      }
  
      res.status(200).json(shops);
    } catch (error) {
      console.error("Error fetching shop information:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports = {getShopInfo}