const Restaurant = require("../models/restaurant");
const Category = require("../models/category");

async function getCategories(req, res) {
    const { id } = req.query;
    
    try {
        const restaurantData = await Restaurant.findById(id);
        if (!restaurantData) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const listOfCategoryID = restaurantData.category;
        const categories = await Category.find({ _id: { $in: listOfCategoryID } });
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getCategories;
