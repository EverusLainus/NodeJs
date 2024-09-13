const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("InventorySystem", "root", "Lainus#1", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log("Error:" + err));

module.exports = sequelize;
