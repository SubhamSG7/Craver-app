const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("location").populate("cuisines");
    res.json(orders);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { customerName, location, cuisines, totalPrice } = req.body;
  try {
    const order = new Order({ customerName, location, cuisines, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ msg: "Error creating order" });
  }
});

router.put("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ msg: "Error updating order" });
  }
});

module.exports = router;
