const mongoose = require("mongoose");

const mongoDbConnect = async () => {
  try {
    const res = await mongoose.connect("mongodb://localhost:27017/library");
    console.log("connected to mongodb");
  } catch (err) {
    console.log("error connecting to mongodb");
  }
};

module.exports = mongoDbConnect;
