const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: String,
  otpExpiration: Date,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
