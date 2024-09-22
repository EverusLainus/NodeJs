const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = new user({ name, password: hashedPassword, role });
    await User.save();
    res.status(201).json({ message: "user registered" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "registration failed" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const User = await user.findOne({ name });
    if (!User) return res.status(400).jons({ error: "invalid credentials" });
    const isMath = await bcrypt.compare(password, User.password);
    if (!isMath) return res.status(400).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { id: User._id, role: User.role },
      process.env.jwt_secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "login failed" });
  }
});

module.exports = authRouter;
