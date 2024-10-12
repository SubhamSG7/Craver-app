const express = require("express");
const router = express.Router();
const Cuisine = require("../models/cuisine");

router.get("/", async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.json(cuisines);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const cuisine = new Cuisine({ name, description, price });
    await cuisine.save();
    res.status(201).json(cuisine);
  } catch (err) {
    res.status(400).json({ msg: "Error adding cuisine" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Cuisine.findByIdAndDelete(req.params.id);
    res.json({ msg: "Cuisine deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting cuisine" });
  }
});

module.exports = router;
