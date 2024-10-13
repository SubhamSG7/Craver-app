const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "User already exists" });
    }

    admin = new Admin({ name, email, password });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, scope: admin.scope },
      process.env.tokenSecret,
      {
        expiresIn: "1h",
      }
    );

    const confirmUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/admin/confirm/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
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
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }
    if (admin.confirmed) {
      return res.status(400).json({ message: "Email already confirmed" });
    }
    admin.confirmed = true;
    await admin.save();
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
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!admin.confirmed) {
      return res.status(400).json({
        msg: "Please confirm your email before logging in",
      });
    }

    const isMatch = await admin.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, scope: admin.scope },
      process.env.tokenSecret,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ msg: "Login successful", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
