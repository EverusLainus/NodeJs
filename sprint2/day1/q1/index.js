const express = require("express");
const app = express();

app.use(express.json());

const MovieModel = require("./db");
const { connection } = require("mongoose");

app.get("/movies", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const filterBy = req.query.filter;
  const searchBy = req.query.search;
  const sortBy = req.query.sort;

  const query = {};
  const skip = (pageNo - 1) * pageSize;
  if (filterBy) {
    query.title = { $eq: filterBy };
  }
  if (searchBy) {
    query.title = { $regex: searchBy, $options: "i" };
  }

  const movies = MovieModel.find(query).skip(skip).limit(pageSize);

  if (sortBy) {
    movies = movies.sort({ sortBy: 1 });
  }

  const result = await movies;

  console.log(movies);
  return res.send(movies);
});

app.post("/movies", async (req, res) => {
  const { title, rating } = req.body;
  const data = new MovieModel({
    title,
    rating,
  });
  await data.save();
  console.log(title + " " + rating);
});

app.delete("/movies/:id", async (req, res) => {
  try {
    console.log(typeof req.params.id);
    const result = await MovieModel.findByIdAndDelete(req.params.id);

    res.send("Movie deleted successfully");
  } catch (err) {
    res.status(500).send("An error occurred while deleting the movie");
  }
});

app.patch("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await MovieModel.findByIdAndUpdate(req.params.id, data);
    res.send("Movie updated successfully");
  } catch (err) {
    res.status(500).send("An error occurred while deleting the movie");
  }
});

app.listen(3000, () => {
  console.log("servers started at http://localhost:3000");
});
