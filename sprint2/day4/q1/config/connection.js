const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDB_connection);
    console.log("connextion success");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
