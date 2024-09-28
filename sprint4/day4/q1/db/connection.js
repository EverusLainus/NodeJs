const mongoose = require("mongoose");
const mongooseConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/app");
    console.log("db connected");
  } catch (err) {
    console.log("db connection failed");
  }
};
module.exports = mongooseConnect;
