const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads" });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  cloudinary.uploader.upload(filePath, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json({
      message: "uploaded successfully",
      imageUrl: result.secure_url,
    });
  });
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
