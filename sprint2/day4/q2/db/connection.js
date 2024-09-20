const mongoose = require("mongoose");

const mongoDbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/19Sep");
  console.log("Connected to myDB");
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});
module.exports = mongoDbConnect;
