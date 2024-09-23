const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User login and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */

authRouter.post("/register", async (req, res) => {
  const { name, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, password: hashedPassword, role });
    await user.save();
    res.send({ message: " registration success" });
  } catch (err) {
    console.log(err.message);
    res.send({ message: "error: registration" });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

authRouter.post("/login", async (req, res) => {
  const { name, password, role } = req.body;
  try {
    const user = await userModel.find({ name });
    if (!user) {
      return res.send({ message: "error: invalid username" });
    }
    const isCorrect = bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.send({ message: "error: invalid password" });
    }
    const token = jwt.sign({ id: user._is, role: user.role });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.send({ message: "error: login" });
  }
});

module.exports = authRouter;
