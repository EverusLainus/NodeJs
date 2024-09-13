const sequelize = require("./db/config");
const Product = require("./models/product");
const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api", productRoutes);
sequelize.sync({ force: false }).then(() => {
  console.log("database and table created");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server listening at http://localhost:3000");
});
