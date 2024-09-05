const express = require("express");

const fs = require("fs/promises");

const app = express();

app.use(express.json());

app.get("/get", async (req, res) => {
  const data = await fs.readFile("db.json", "utf-8");
  console.log(data);
  return res.send(data);
});

app.post("/add", async (req, res) => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    const todos = JSON.parse(data);

    const newTodo = req.body;
    todos.todos.push(newTodo);

    await fs.writeFile("db.json", JSON.stringify(todos, null, 2));
    res.status(201).send("Todo added");
  } catch (error) {
    res.status(500).send("Error adding todo");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    const todos = JSON.parse(data);

    const filteredTodo = todos.todos.filter((todo) => !todo.status);

    console.log(todos.todos);

    await fs.writeFile(
      "db.json",
      JSON.stringify({ todos: filteredTodo }, null, 2)
    );
    res.status(200).send("updated status");
  } catch (error) {
    res.status(500).send("Error updating status");
  }
});

app.patch("/update", async (req, res) => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    const todos = JSON.parse(data);

    todos.todos.forEach((todo) => {
      if (todo.id % 2 == 0) {
        todo.status = true;
      }
    });

    await fs.writeFile("db.json", JSON.stringify(todos, null, 2));
    res.status(200).send("updated status");
  } catch (error) {
    res.status(500).send("Error updating status");
  }
});

app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});
