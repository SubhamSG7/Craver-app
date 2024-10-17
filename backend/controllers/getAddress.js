const User = require("../models/user");
const jwtHandler = require("../jwthandler/jwthandler");

async function getAddress(req, res) {
    const token = req.cookies.token;
    try {
        const { id } = await jwtHandler(token);
        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ address: user.address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = getAddress;
