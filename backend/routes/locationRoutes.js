const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const location = new Location({ name, address, phone, email });
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ msg: "Error adding location" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ msg: "Location deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting location" });
  }
});

module.exports = router;
