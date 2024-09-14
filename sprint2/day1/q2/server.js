const express = require("express");
const mongoose = require("mongoose");

const dynamicDataRoute = require("./routes/dynamicDataRoute");

const app = express();
const PORT = 300;

mongoose.connect("mongodb://localhost:27017/dataDb");

app.use("/data", dynamicDataRoute);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
