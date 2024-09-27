const multer = require("multer");
const path = require("path");

const uploadFolder = path.join(__dirname, "uploads");
console.log("folder to upload dsfos: ", uploadFolder);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

console.log(storage.destination);
console.log(storage.filename);
