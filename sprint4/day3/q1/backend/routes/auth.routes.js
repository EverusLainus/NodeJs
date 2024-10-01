const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/user.model");
const userModel = require("../models/user.model");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiration = Date.now() + 10 * 60 * 1000;

    user = new userModel({
      email,
      password: hashedPassword,
      otp,
      otpExpiration,
    });

    await user.save();

    res.json({ message: "otp send" });
  } catch (err) {
    console.log(err);
    res.send(500).send("server error");
  }
});

authModel.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userModel.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = authRouter;
