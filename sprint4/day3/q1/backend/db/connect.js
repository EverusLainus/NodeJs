const mongoose = require("mongoose");
const mongodbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth");
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting to db");
  }
};

module.exports = mongodbConnect;
