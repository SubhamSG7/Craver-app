const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  scope: {
    type: String,
    require: true,
    default: "staff",
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  restaurant: {
    type: String,
    required: true,
    default: "not Assigned",
  },
});

staffSchema.pre("save", async function (next) {
  const staff = this;
  if (!staff.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  staff.password = await bcrypt.hash(staff.password, salt);
  next();
});

staffSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
