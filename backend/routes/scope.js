const checkScope = require("./auth");
const express = require("express");
const router = express.Router();

router.get("/:role", checkScope(), (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the Admin Dashboard",authorised:true, user: req.user });
});

module.exports = router;
