const express = require("express");
const Staff = require("../models/staff");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const getrestaurant=require("../controllers/getrestaurant");
const saveCategory=require("../controllers/saveCategory");
require("dotenv").config();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let staff = await Staff.findOne({ email });
    if (staff) {
      return res.status(400).json({ message: "Staff member already exists" });
    }

    staff = new Staff({ name, email, password });
    await staff.save();

    const token = jwt.sign({ id: staff._id,scope:staff.scope }, process.env.tokenSecret, {
      expiresIn: "1h",
    });

    const confirmUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/staff/confirm/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: staff.email,
      subject: "Confirm Your Email",
      text: `Click the following link to confirm your email: ${confirmUrl}`,
      html: `<p>Click the following link to confirm your email:</p><a href="${confirmUrl}">${confirmUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

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
    const staff = await Staff.findById(decoded.id);
    if (!staff) {
      return res.status(400).json({ message: "Staff member not found" });
    }
    if (staff.confirmed) {
      return res.status(400).json({ message: "Email already confirmed" });
    }
    staff.confirmed = true;
    await staff.save();
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
    let staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ msg: "Staff member not found" });
    }

    if (!staff.confirmed) {
      return res.status(400).json({
        msg: "Please confirm your email before logging in",
      });
    }

    const isMatch = await staff.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: staff._id,scope:staff.scope }, process.env.tokenSecret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ msg: "Login successful", staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/getrestaurant",getrestaurant)
router.post("/addcategory",saveCategory)
module.exports = router;
