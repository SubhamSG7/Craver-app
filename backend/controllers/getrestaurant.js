const jwthandler = require("../jwthandler/jwthandler");
const Staff = require("../models/staff");
const Restaurant = require("../models/restaurant");

async function getrestaurant(req, res) {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(400).json({ message: "Token Not Found" });
  }
  try {
    const { id } = await jwthandler(token);
    const staffData = await Staff.findById(id);
    if (!staffData) {
      return res.status(404).json({ message: "Staff not found" });
    }
    if (!staffData.approved || !staffData.confirmed) {
      return res
        .status(422)
        .json({ message: "Waiting For Admin to Assign Role" });
    }
    const restaurantAssigned = staffData.restaurant;
    const restaurantDetail = await Restaurant.findOne({
      name: restaurantAssigned,
    });
    if (!restaurantDetail) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json(restaurantDetail);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = getrestaurant;
