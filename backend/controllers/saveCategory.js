const cloudinary = require("../config/cloudinary");
const Category = require("../models/category");
const fs = require("fs");
const Restaurant = require("../models/restaurant");

async function saveCategory(req, res) {
  const { dishname, category, cuisine, dishdetail, price, discount, restaurant_id } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }
  
  try {
    
    const { secure_url: imageUrl } = await cloudinary.uploader.upload(image.path, {
      folder: "restaurants",
      public_id: `${dishname}_${Date.now()}`,
    });
    fs.unlink(image.path, (err) => {
      if (err) {
        console.error("Error deleting the local file:", err);
      }
    });
    const newCategory = new Category({
      name: dishname,
      image: imageUrl,
      description: dishdetail,
      price: Number(price),
      discount: Number(discount) || 0,
      category: category,
      cuisine: cuisine,
    });
    const categorySaved = await newCategory.save();

    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.category.push(categorySaved._id);
    await restaurant.save();
    return res.status(201).json({
      message: "Category saved successfully!",
      data: categorySaved,
    });
    
  } catch (error) {
    console.error("Error saving category:", error);
    return res.status(500).json({ error: "Failed to save category" });
  }
}

module.exports = saveCategory;
