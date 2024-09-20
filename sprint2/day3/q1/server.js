const express = require("express");
const productRouter = require("./routes/product.route");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "hello from server" });
});

app.use("/products", productRouter);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
