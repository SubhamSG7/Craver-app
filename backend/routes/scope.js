const checkScope = require("./auth");
const express = require("express");
const router = express.Router();

router.get("/admin", checkScope("admin"), (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

module.exports = router;
