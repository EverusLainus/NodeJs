const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("product", productModel);
module.exports = productModel;
