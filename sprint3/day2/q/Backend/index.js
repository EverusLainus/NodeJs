const express = require("express");
const app = express();
const mongodbConnect = require("./db/connection");
const taskRouter = require("./routes/taskRoutes");

mongodbConnect();

app.use(express.json());
app.use("/tasks", taskRouter);

app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});
