const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    match: [
      /^[A-Za-z\s]+$/,
      "Name should only contain alphabetic characters and spaces",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: [true, "Confirmed status is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-zA-Z0-9]).{7,}$/,
      "Password must contain at least one letter, one number, and be 7 characters or longer",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [
      /^\+91[1-9]{1}[0-9]{9}$|^[1-9]{1}[0-9]{9}$/,
      "Please enter a valid 10-digit phone number",
    ],
  },
  scope: {
    type: String,
    required: [true, "Scope is required"],
    default: "user",
  },
  placedorders: {
    type: [String],
    default: [],
    required: [true, "Placed orders are required"],
  },
  address: {
    type: String,
    default: "Not Provided",
    required: [true, "Address is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
