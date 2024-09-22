const express = require("express");
const task = require("../models/taskModel");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const authRoute = express.Router();

authRoute.post(
  "/",
  authenticateUser,
  authorizeRoles("member"),
  async (req, res) => {
    const { title, description } = req.body;
    try {
      const Task = new task({ title, description, user: req.user.id });
      await Task.save();
      res.status(301).json({ Task });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "task creating failed" });
    }
  }
);

authRoute.patch(
  "/:id/complete",
  authenticateUser,
  authorizeRoles("member"),
  async (req, res) => {
    try {
      const Task = await task.findOne(req.params.id);
      if (!Task || Task.user.toString() !== req.user.id)
        return res.status(403).json({ error: "unauthorized" });
      Task.status = "completed";
      Task.completeAt = new Date();
      await Task.save();
      res.status(200).json({ Task });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "failed to update the task" });
    }
  }
);

authRoute.get(
  "/",
  authenticateUser,
  authorizeRoles("member"),
  async (req, res) => {
    try {
      const tasks = await task.find({ user: req.user.id });
      res.status(200).json({ tasks });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "failed to fetch" });
    }
  }
);

authRoute.get(
  "/all",
  authenticateUser,
  authorizeRoles("member", "admin"),
  async (req, res) => {
    try {
      const Tasks = await task.find();
      res.status(200).json({ Tasks });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "failed to fetch" });
    }
  }
);

module.exports = authRoute;
