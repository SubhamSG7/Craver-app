const PlacedOrder = require("../models/placedOrders");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

async function cancelOrder(req, res) {
    const { orderId, userId, restaurantId } = req.body;

    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        
        userData.placedorders = userData.placedorders.filter(order => order.toString() !== orderId);
        const restaurantData = await Restaurant.findById(restaurantId);
        if (!restaurantData) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        restaurantData.placedorders = restaurantData.placedorders.filter(order => order.toString() !== orderId);

        await userData.save();
        await restaurantData.save();

        const result = await PlacedOrder.deleteOne({ _id: orderId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Order not found or already deleted" });
        }
        res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ message: "An error occurred while canceling the order" });
    }
}

module.exports = cancelOrder;
