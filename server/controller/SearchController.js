const Food = require("../model/Food"); // Import the Food model


// Controller function to search food items by type and category
const searchFood = async (req, res) => {
  console.log(req.query)
  const { name, type, category, shopName } = req.query;

  try {
    let query = {};

    // Build the MongoDB query based on provided parameters
    if (shopName && type && category && name) {
      query = {
        shopName: { $regex: new RegExp(shopName, "i") },
        type: type,
        category: { $regex: new RegExp(category, "i") },
        name: { $regex: new RegExp(name, "i") },
      };
    } else if (shopName && type && name) {
      query = {
        shopName: { $regex: new RegExp(shopName, "i") },
        type: type,
        name: { $regex: new RegExp(name, "i") },
      };
    } else if (shopName && type) {
      query = {
        shopName: { $regex: new RegExp(shopName, "i") },
        type: type,
      };
    } else if (shopName && name) {
      query = {
        shopName: { $regex: new RegExp(shopName, "i") },
        name: { $regex: new RegExp(name, "i") },
      };
    } else if (type && category) {
      query = {
        type: type,
        category: { $regex: new RegExp(category, "i") },
      };
    } 
    else if(type && name){
      query = {
        type: type,
        name: { $regex: new RegExp(name, "i") },
      };
    }
    else if(type && shopName){
      query = {
        type: type,
        shopName: { $regex: new RegExp(shopName, "i") },
      };
    }
    else if (shopName) {
      query = { shopName: { $regex: new RegExp(shopName, "i") } };
    } 
    else if (name) {
      query = { name: { $regex: new RegExp(name, "i") } };
    }
    else if (type) {
      query = { type: type };
    } 
    else if (category) {
      query = { category: { $regex: new RegExp(category, "i") } };
    }

    let foods = await Food.find(query);

    if (foods.length === 0) {
      const message = `No food items found matching the search criteria`;
      return res.status(404).json({ message });
    }
     foods = sortByShopAndCategory(foods);

    res.status(200).json(foods);
  } catch (error) {
    console.error(
      "Error searching for food items by type and category:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};


// function sortByCategory(foodItems) {
//   const categories = {};

//   // Group items by category
//   foodItems.forEach((item) => {
//     if (!categories[item.category]) {
//       categories[item.category] = [];
//     }
//     categories[item.category].push(item);
//   });

//   // Convert to the desired format
//   const result = Object.keys(categories).map((category) => ({
//     category,
//     items: categories[category].map((item) => ({
//       name: item.name,
//       isAvailable: item.isAvailable,
//       price: item.price,
//       type: item.type === "Vegeterian" ? "Vegetarian" : "Non-Vegetarian",
//       ratings: item.ratings,
//       ratingCount: item.ratingCount,
//       _id: item._id,
//     })),
//   }));

//   return result
// }

function sortByShopAndCategory(foodItems) {
  const shops = {};

  // Group items by shop and category
  foodItems.forEach((item) => {
    if (!shops[item.shopName]) {
      shops[item.shopName] = {};
    }
    if (!shops[item.shopName][item.category]) {
      shops[item.shopName][item.category] = [];
    }
    shops[item.shopName][item.category].push(item);
  });

  // Convert to the desired format
  const result = Object.keys(shops).map((shopName) => ({
    shopName,
    categories: Object.keys(shops[shopName]).map((category) => ({
      category,
      items: shops[shopName][category].map((item) => ({
        name: item.name,
        isAvailable: item.isAvailable,
        price: item.price,
        type: item.type === "Vegetarian" ? "Vegetarian" : "Non-Vegetarian",
        ratings: item.ratings,
        ratingCount: item.ratingCount,
        _id: item._id,
      })),
    })),
  }));

  return result;
}

module.exports = { searchFood,sortByShopAndCategory };
