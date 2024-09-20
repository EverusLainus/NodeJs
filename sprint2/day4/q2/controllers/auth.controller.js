const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const isExist = await userModel.findOne({ email: email });
    if (isExist) {
      return res.send({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function login(req, res) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send({ message: "logged in successfully", user });
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).send({ message: err.message });
    return res.send({ message: "logged out successfully" });
  });
}

function getToken(req, res) {
  if (req.isAuthenticated()) return res.send({ user: req.user });
  return res.status(500).send({ message: "unauthorised" });
}

module.exports = { register, login, logout, getToken };
