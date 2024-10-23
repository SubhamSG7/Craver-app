const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const regiserUser=require("../controllers/registerUser");
const loginUser=require("../controllers/loginUser");
require("dotenv").config();
const router = express.Router();
const getPlacedOrders=require("../controllers/getPlacedOrders");
router.use(express.json());

router.post("/register",regiserUser);

router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.confirmed) {
      return res.status(400).json({ message: "Email already confirmed" });
    }
    user.confirmed = true;
    await user.save();
    res.status(200).json({
      message: "Email confirmed successfully. You can now log in.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

router.post("/login", loginUser);

router.get("/placedorders",getPlacedOrders)

module.exports = router;
