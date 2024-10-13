const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/restaurants", async (req, res) => {
  try {
    const restaurantData = await Restaurant.find();
    res.status(200).json(restaurantData);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res.status(500).json({ message: "Failed to fetch restaurant data" });
  }
});

module.exports = router;
