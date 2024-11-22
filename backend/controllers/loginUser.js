const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginUser(req, res) {
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
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = loginUser;
