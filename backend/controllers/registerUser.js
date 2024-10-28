const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

async function registerUser(req, res) {
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
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "Email or phone number already in use." });
    } else if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: "Validation Error", errors });
    } else {
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
}

module.exports = registerUser;
