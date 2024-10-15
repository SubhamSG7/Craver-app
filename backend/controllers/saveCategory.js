const upload = require("../multer/multer");
const cloudinary = require("../config/cloudinary");
const Category = require("../models/category");
const fs = require("fs");

async function saveCategory(req, res) {
  try {
    const { dishname, category, cuisine, dishdetail, price, discount } =
      req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      folder: "restaurants",
      public_id: `${dishname}_${Date.now()}`,
    });

    const imageUrl = uploadResponse.secure_url;

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

    await newCategory.save();
    res
      .status(201)
      .json({ message: "Category saved successfully!", data: newCategory });
  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ error: "Failed to save category" });
  }
}

module.exports = saveCategory;
