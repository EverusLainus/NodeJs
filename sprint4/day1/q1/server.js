const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
const uploadFolder = path.join(__dirname, "uploads");
console.log("folder to upload: ", uploadFolder);

if (!fs.existsSync(uploadFolder)) {
  console.log("creating new folder ");
  fs.mkdirSync(uploadFolder);
} else {
  console.log("that folder already exist ");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(uploadFolder));

app.post("/upload", upload.single("video"), (req, res) => {
  console.log("File uploaded successfully:", req.file.filename);
  res.status(201).json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(4000, () => {
  console.log("Server listening on http://localhost:4000");
});
