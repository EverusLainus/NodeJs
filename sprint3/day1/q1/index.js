const { auth } = require("./middleware/auth.middleware");

const express = require("express");
const jwt = require("jsonwebtoken");

const mongoDbConnect = require("./db/connection");
const userModel = require("./models/userModel");
const bookRouter = require("./routes/bookRoutes");
const app = express();

app.use(express.json());
app.use("/books", bookRouter);
const SERVER_JWT_SECRET = "secret";

mongoDbConnect();
app.post("/register", async (req, res) => {
  try {
    const user = new userModel({
      ...req.body,
    });
    await user.save();
    return res.status(201).send({ message: "user created succesfully" });
  } catch (err) {
    return res.status(201).send({ message: "user creation failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user && user.password === password) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        userid: user.id,
        //role: user.role,
      },
      SERVER_JWT_SECRET,
      {
        expiresIn: "1 hour",
      }
    );
    const refreshToken = jwt.sign({}, SERVER_JWT_SECRET, {
      expiresIn: "1 week",
    });
    return res.send({
      message: "found user",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    return res.status(401).send({ message: "unauthorized" });
  }
});
app.use(auth);

app.get("/dashboard", (req, res) => {
  const token = req.headers.token;
  try {
    const verification = jwt.verify(token, SERVER_JWT_SECRET);
    if (!token || !verification) {
      return res.status(403).send({
        message: "forbidden",
      });
    }
    res.send("dashboard page");
  } catch (err) {
    return res.status(403).send({
      message: "forbidden",
    });
  }
});

app.listen(3000, () => {
  console.log("server stared at http://localhost:3000");
});

module.exports = SERVER_JWT_SECRET;
