const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const jwthandler = require("../jwthandler/jwthandler");
const placedOrder = require("../models/placedOrders");
const axios = require("axios");
require("dotenv").config();

async function placeOrder(req, res) {
    const { restaurantId, cartData, address } = req.body;
    if (!restaurantId || !Array.isArray(cartData) || cartData.length === 0 || !address) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const token = req.cookies.token;
    const { id } = await jwthandler(token);
    try {
        const response = await axios.get(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.geo_codingKey}`);
        const { lat, lon, display_name } = response?.data[0];
        if (lat && lon && display_name) {
            const uploadProductDetails = await placedOrder.create({
                restaurantId,
                userId: id,
                product: [...cartData],
                orderStatus: "placed",
                coordinates: [lat, lon],
                address: display_name
            });
            const orderId = uploadProductDetails._id;
            await User.findByIdAndUpdate(id, { $push: { placedorders: orderId } });
            await Restaurant.findByIdAndUpdate(restaurantId, { $push: { placedorders: orderId } });
            return res.status(201).json({
                success: true,
                message: 'Order placed successfully',
                order: uploadProductDetails
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid address or coordinates' });
        }
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}

module.exports = placeOrder;
