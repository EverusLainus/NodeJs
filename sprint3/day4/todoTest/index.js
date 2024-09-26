const express = require("express");
const mongoose = require("mongoose");
const todo = require("./models/todo");

const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todoApp");

const app = express();
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

app.use(limiter);

app.post("/todos", async (req, res) => {
  try {
    const Todo = new todo({
      title: req.body.title,
      description: req.body.description,
    });
    await Todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "error creating todo" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const Todo = await todo.find();
    res.status(200).json(Todo);
  } catch (err) {
    res.status(500).json({ error: "error fetching todos" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const Todo = await todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Todo) return res.status(404).json({ error: "todo not found" });
    res.status(200).json(Todo);
  } catch (err) {
    res.status(500).json({ error: "error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const Todo = await todo.findByIdAndDelete(req.params.id);
    if (!Todo) return res.status(404).json({ error: "todo not found" });
    res.status(200).json({ message: "todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "error deleting todo" });
  }
});

app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
