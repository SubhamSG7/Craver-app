const jwtHandler = require("../jwthandler/jwthandler");
const Placedorders = require("../models/placedOrders");
const User = require("../models/user");

async function getPlacedOrders(req, res) {
    try {
        const token = req.cookies.token;
        const { id } = await jwtHandler(token);
        const userData = await User.findById(id);
        
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderList = userData.placedorders;
        const orderDetails = await Promise.all(
            orderList.map(async (orderId) => {
                const orderDetail = await Placedorders.findById(orderId);
                if (orderDetail) {
                    return {
                        _id: orderDetail._id,
                        userId: orderDetail.userId,
                        restaurantId: orderDetail.restaurantId,
                        orderStatus: orderDetail.orderStatus,
                        address: orderDetail.address,
                        coordinates: orderDetail.coordinates,
                        createdAt: orderDetail.createdAt,
                        updatedAt: orderDetail.updatedAt,
                        products: orderDetail.product.map((item) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                        })),
                    };
                }
            })
        );

        const filteredOrderDetails = orderDetails.filter(Boolean);
        return res.status(200).json(filteredOrderDetails);
    } catch (error) {
        console.error("Error fetching placed orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = getPlacedOrders;
