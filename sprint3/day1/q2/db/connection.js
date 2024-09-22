const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("connected to db");
  } catch (err) {
    console.log("error ocurred while connecting to mongoose", err);
  }
};

module.exports = mongodbConnect;
