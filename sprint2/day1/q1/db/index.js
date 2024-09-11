const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connection = mongoose.connect("mongodb://localhost:27017/movies");

const MovieSchema = new Schema({
  title: String,
  rating: Number,
});
//name of the collection movie
const MovieModel = new model("movie", MovieSchema);

module.exports = MovieModel;
