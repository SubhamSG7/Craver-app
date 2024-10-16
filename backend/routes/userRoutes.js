const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();
const getPlacedOrders=require("../controllers/getPlacedOrders");

router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    user = new User({ name, email, phone, password: hashedPassword });
    const token = jwt.sign(
      { id: user._id, scope: user.scope },
      process.env.tokenSecret,
      {
        expiresIn: "1h",
      }
    );
    const confirmUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/confirm/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Confirm Your Email",
      text: `Click the following link to confirm your email: ${confirmUrl}`,
      html: `<p>Click the following link to confirm your email:</p><a href="${confirmUrl}">${confirmUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);
    await user.save();
    res.status(200).json({
      message: "Registration email sent. Please check your inbox to confirm.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (!user.confirmed) {
      return res
        .status(400)
        .json({ msg: "Please confirm your email before logging in" });
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, scope: user.scope },
      process.env.tokenSecret,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/placedorders",getPlacedOrders)

module.exports = router;
