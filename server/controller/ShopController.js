const Food = require('../model/Food'); // Import the Food model
const Shop = require('../model/Shop');



const getAllShop = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    const updatedShops = await Promise.all(
      shops.map(async (shop) => {
        const foods = await getFood(shop.name);
        return {
          ...shop._doc,
          foods
        };
      })
    );
    res.status(200).json(updatedShops);
  } catch (error) {
    console.error("Error fetching shop information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFood = async (shopName) => {
  const foods = await Food.find({ shopName }).limit(3);
  return foods;
}

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
  
module.exports = {getShopInfo,getAllShop}