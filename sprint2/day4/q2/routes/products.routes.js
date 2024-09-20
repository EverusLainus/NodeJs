const express = require("express");
const { Router } = express;
const productRouter = Router();
const {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/product.controller");

productRouter.get("/", getProducts);

productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
