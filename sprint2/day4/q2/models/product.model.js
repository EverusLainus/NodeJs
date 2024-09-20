const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
});

const productModel = model("product", productSchema);

module.exports = productModel;
