const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const adminRouter = require("./routes/adminRoutes");

const mongodbConnect = require("./db/connection");
mongodbConnect();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/admin", adminRouter);
app.listen(3000, () => {
  console.log("server runs in http://localhost:3000");
});
