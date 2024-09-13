const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = Product;
