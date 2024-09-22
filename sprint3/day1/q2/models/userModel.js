const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "manager", "member"],
  },
});

const userModel = model("user", userSchema);

module.exports = userModel;
