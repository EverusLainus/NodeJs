const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogPostModel = require("./models/blogPost");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017");

app.post("/blogs", async (req, res) => {
  try {
    const blogPost = new blogPostModel(req.body);
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/blog", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAT",
    order = "dec",
    author,
    tags,
  } = req.query;

  const filter = {};
  if (author) filter.author = author;
  if (tags) filter.tags = { $in: tags.split(",") };

  try {
    const blogs = await blogPostModel
      .find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/blogs/:id", async (req, res) => {
  try {
    const blogPost = await blogPostModel.findByIdAndUpdata(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!blogPost) {
      return res.status(404).send();
    }
    res.send(blogPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/blogs/:id", async (req, res) => {
  try {
    const blogPost = await blogPostModel.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).send();
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("server started in http://localhost:3000");
});
