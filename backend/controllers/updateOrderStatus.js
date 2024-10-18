const jwthandler = require("../jwthandler/jwthandler");
const PlacedOrder = require("../models/placedOrders");

async function updateOrderStatus(req, res) {
    const { orderId, newStatus } = req.body;
    const { token } = req.cookies;

    try {
        const userData = await jwthandler(token);
        const placedOrder = await PlacedOrder.findById(orderId);
        if (!placedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        placedOrder.orderStatus = newStatus;

        await placedOrder.save();
        return res.status(200).json({ message: "Order status updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while updating the order status", error: error.message });
    }
}

module.exports = updateOrderStatus;
