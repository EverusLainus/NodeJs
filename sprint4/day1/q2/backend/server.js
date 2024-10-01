const express = require("express");
const path = require("path");
const app = express();

app.get("/uploads/:quality", (req, res) => {
  const quality = req.params.quality;
  const filePath = path.resolve(__dirname, `uploads/${quality}.m3u8`);
  res.sendFile(filePath);
});

app.listen(4000, () => {
  console.log("server started at http://localhost:4000");
});
