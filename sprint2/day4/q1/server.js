const express = require("express");
const { connectDB } = require("./config/connection");
const studentRoute = require("./routes/studentRoute");
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use("/students", studentRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
