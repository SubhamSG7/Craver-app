const jwtHandler = require("../jwthandler/jwthandler");
const Placedorders = require("../models/placedOrders");
const Restaurant = require("../models/restaurant");
const Staff = require("../models/staff");
const User = require("../models/user");

async function getPlacedOrders(req, res) {
    try {
        const token = req.cookies.token;
        const { id, scope } = await jwtHandler(token);
        
        let userData;

        if (scope === "user") {
            userData = await User.findById(id);
            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }
        } else if (scope === "staff") {
            const staffData = await Staff.findById(id);
            if (!staffData) {
                return res.status(404).json({ message: "Staff not found" });
            }
            userData = await Restaurant.findOne({ name: staffData.restaurant });
            if (!userData) {
                return res.status(404).json({ message: "Restaurant not found" });
            }
        } else {
            return res.status(400).json({ message: "Invalid user scope" });
        }
        const orderList = userData.placedorders;
        const orderDetails = await Placedorders.find({ _id: { $in: orderList } });
        const formattedOrderDetails = orderDetails.map(order => ({
            _id: order._id,
            userId: order.userId,
            restaurantId: order.restaurantId,
            orderStatus: order.orderStatus,
            address: order.address,
            coordinates: order.coordinates,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            products: order.product.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            }))
        }));

        return res.status(200).json(formattedOrderDetails);

    } catch (error) {
        console.error("Error fetching placed orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = getPlacedOrders;
