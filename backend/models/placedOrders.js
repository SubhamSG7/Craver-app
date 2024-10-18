const mongoose = require("mongoose");

const placedOrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User' 
  },
  restaurantId: {
    type: String,
    required: true,
    ref: 'Restaurant' 
  },
  product:[{
    id: { type: String, required: true }, 
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
}],
  orderStatus: {
    type: String,
    enum: ['placed', 'preparing', 'dispatched', 'delivered'],
    required: true
  },
  address: {
    type: String,
    required: true 
  },
  coordinates: {
    type: [Number], 
    required: true
  }
}, { timestamps: true });

const PlacedOrder = mongoose.model("PlacedOrder", placedOrderSchema);

module.exports = PlacedOrder;
