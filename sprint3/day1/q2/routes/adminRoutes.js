const express = require("express");
const user = require("../models/userModel");
const task = require("../models/taskModel");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const adminRouter = express.Router();

adminRouter.patch(
  "/user/:id/toggle",
  authenticateUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const User = await user.findById(req.params.id);
      if (!User) return res.status(404).json({ error: "user not found" });

      user.active = !user.active;
      await user.save();
      res.status(200).json({ message: "user status modified" });
    } catch (err) {
      res.status(500).json({ error: "error modifying user status" });
    }
  }
);

adminRouter.get(
  "/stats",
  authenticateUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const totalTasks = await task.countDocuments();
      const completedTasks = await task.countDocuments({ status: "completed" });
      const pendingTasks = await task.countDocuments({ status: "pending" });
      res.status(200).json({ totalTasks, completedTasks, pendingTasks });
    } catch (err) {
      res.status(500).json({ error: "failed to get tasks" });
    }
  }
);

module.exports = adminRouter;
