const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        if (req.cookies.token) {
            res.clearCookie("token"); 
        }
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
