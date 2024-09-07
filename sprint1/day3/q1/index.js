const express = require("express");
const app = express();
app.use(express.json());

function validateRequestBody(req, res, next) {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;
  if (typeof ID != "number") {
    return res
      .status(400)
      .send("Invalid data type for ID. keys are case-sensitive");
  }
  if (typeof Name != "string") {
    return res
      .status(400)
      .send("Invalid data type for Name. keys are case-sensitive");
  }
  if (typeof Rating != "number") {
    return res
      .status(400)
      .send("Invalid data type for Rating. keys are case-sensitive");
  }
  if (typeof Description != "string") {
    return res
      .status(400)
      .send("Invalid data type for Description. keys are case-sensitive");
  }
  if (typeof Genre != "string") {
    return res
      .status(400)
      .send("Invalid data type for Genre. keys are case-sensitive");
  }
  if (!Array.isArray(Cast) || !Cast.every((c) => typeof c === "string")) {
    return res
      .status(400)
      .send("Invalid data type for Cast. keys are case-sensitive");
  }
  next();
}

app.post("/", validateRequestBody, (req, res) => {
  const data = res.body;
  console.log(typeof data);
  return res.send(data);
});

app.listen(3000, () => {
  console.log("server running in http://localhost:3000");
});
