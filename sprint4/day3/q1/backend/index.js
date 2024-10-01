const express = require("express");
const app = express();
const mongodbConnect = require("./db/connect");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.route.js");
app.use("/api/auth", authRoutes);

app.listen(4000, async () => {
  console.log("server started at http://localhost:4000");
  await mongodbConnect();
});
