const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
});

const bookModel = model("book", bookSchema);

module.exports = bookModel;
