const productModel = require("../models/product.model");
const mongoose = require("mongoose");
async function getProducts(req, res) {
  try {
    const data = await productModel.find();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.send({ message: err });
  }
}
async function addProduct(req, res) {
  const { id, title, price } = req.body;
  try {
    const newData = new productModel({ id, title, price });
    await newData.save();
    return res.send(newData);
  } catch (err) {
    console.log(err);
    return res.send({ message: err });
  }
}
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!mongoose.isValidObjectId(id)) {
      console.log("Invalid ObjectId format:", id); // Log invalid ID
      return res.status(400).send({ message: "Invalid product ID format" });
    }
    var result = await productModel.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ message: "movie updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    var objectId;
    if (!mongoose.isValidObjectId(id)) {
      console.log("Invalid ObjectId format:", id); // Log invalid ID
      var result = await productModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send({ message: "Product not found" });
      }
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    return res.status(200).send({ message: "movie delete successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
module.exports = { getProducts, updateProduct, deleteProduct, addProduct };
