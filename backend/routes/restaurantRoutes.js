const express = require("express");
const router = express.Router();
const upload = require("../multer/multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const Restaurant = require("../models/restaurant");
const getGeoloaction = require("../thirdPartyApi/getGeoloaction");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, address, about } = req.body;
    const image = req.file;
    const addressfromGeoloaction = await getGeoloaction(address);
    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      folder: "restaurants",
      public_id: `${name}_${Date.now()}`,
    });
    const imageUrl = uploadResponse.secure_url;
    fs.unlink(image.path, (err) => {
      if (err) {
        console.error("Error deleting the local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });
    const newRestaurant = new Restaurant({
      name,
      address,
      about,
      imageUrl: imageUrl,
      geolocation: {
        latitude: addressfromGeoloaction.latitude,
        longitude: addressfromGeoloaction.longitude,
      },
    });
    await newRestaurant.save();
  } catch (error) {
    fs.unlink(image.path, (err) => {
      if (err) {
        console.error("Error deleting the local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({
      message: "Error uploading the image",
      error: error.message,
    });
  }
});

module.exports = router;
