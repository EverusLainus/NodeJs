const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chatApp");
    console.log("db connected");
  } catch (err) {
    console.log("error connecting db");
  }
};

module.connect = connectDB;
