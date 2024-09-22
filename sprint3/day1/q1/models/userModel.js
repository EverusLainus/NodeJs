const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    required: true,
    default: "CREATOR",
    enum: ["CREATOR", "VIEWER", "VIEW_ALL"],
  },
});

const userModel = model("user", userSchema);

module.exports = userModel;
