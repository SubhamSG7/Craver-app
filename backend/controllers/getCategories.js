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

        const allCategories = await Promise.all(
            listOfCategoryID.map(async (val) => {
                return await Category.findById(val);
            })
        );
        res.json( allCategories );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getCategories;
