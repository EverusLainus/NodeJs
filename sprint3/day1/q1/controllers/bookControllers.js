const bookModel = require("../models/bookModel");

async function getAllBooks(req, res) {
  try {
    const res = await bookModel.find();
    return res.status(200).send(res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function addBook(req, res) {
  try {
    const { title, author } = req.body;
    const book = new bookModel(title, author);
    await book.save();
    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function updateBook(req, res) {
  try {
    const res = await bookModel.find();
    return res.status(200).send(res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function deleteBook(req, res) {
  try {
    const res = await bookModel.find();
    return res.status(200).send(res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = { getAllBooks, addBook, updateBook, deleteBook };
