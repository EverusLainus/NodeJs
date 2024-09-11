const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const app = express();

app.use(express.json());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(
  morgan(
    `:method :status: response-time ms :res[content-length] :http-version  :url \n`,
    { stream: accessLogStream }
  )
);

app.get("/", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  console.log(data);
  return res.send(data);
});

app.get("/get-users", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  console.log(data.users);
  return res.send(data.users);
});

app.post("/add-user", (req, res) => {
  const newUser = req.body;

  try {
    const data = fs.readFileSync("./db.json", "utf-8");
    const jsonData = JSON.parse(data);

    if (jsonData.users && Array.isArray(jsonData.users)) {
      jsonData.users.push(newUser);
    } else {
      jsonData.users = [newUser];
    }

    fs.writeFileSync("./db.json", JSON.stringify(jsonData, null, 2));

    return res.status(201).json(jsonData);
  } catch (err) {
    console.error("Error reading or writing file", err);
    return res.status(500).send("Error processing the data");
  }
});

app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUserData = req.body;
  try {
    const data = fs.readFileSync("./db.json", "utf-8");
    const jsonData = JSON.parse(data);

    const userIndex = jsonData.users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      jsonData.users[userIndex] = {
        ...jsonData.users[userIndex],
        ...updatedUserData,
      };

      fs.writeFileSync("./db.json", JSON.stringify(jsonData, null, 2));

      return res.status(201).json(jsonData.users[userIndex]);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error reading or writing file", err);
    return res.status(500).send("Error processing the data");
  }
});

app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const data = fs.readFileSync("./db.json", "utf-8");
    const jsonData = JSON.parse(data);

    jsonData.users = jsonData.users.filter((user) => user.id !== userId);
    if (!jsonData.users || !Array.isArray(jsonData.users)) {
      return res.status(400).send("Users data not found or is not an array.");
    }
    fs.writeFileSync("./db.json", JSON.stringify(jsonData, null, 2));

    return res.send({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error reading or writing file", err);
    return res.status(500).send("Error processing the data");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000 at http://localhost:3000");
});
