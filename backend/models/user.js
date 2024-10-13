const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+91[1-9]{1}[0-9]{9}$|^[1-9]{1}[0-9]{9}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  scope: {
    type: String,
    require: true,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
