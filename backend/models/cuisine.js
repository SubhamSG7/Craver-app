const mongoose = require("mongoose");

const CuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image:{type:String,required:true},
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Cuisine", CuisineSchema);
