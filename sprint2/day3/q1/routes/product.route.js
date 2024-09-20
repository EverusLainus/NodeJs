const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);
productRouter.patch("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);

module.exports = productRouter;
