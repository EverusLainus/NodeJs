const express = require("express");
const router = express.Router();

router.use(express());

const Product = require("../models/product");
const { Sequelize, where } = require("sequelize");

router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/products", async (req, res) => {
  const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let result = {};
  if (search) result.search = { [Sequelize.Op.like]: `%${search}` };
  if (minPrice) result.price = { ...where.price, [Sequelize.Op.gte]: minPrice };
  if (maxPrice) result.price = { ...where.price, [Sequelize.Op.lye]: maxPrice };
  try {
    const products = await Product.findAll({ result });
    products = await Product.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.send(product);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.send({ message: "deleted success" });
    } else {
      res.status(404).send({ message: "product not fount" });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
