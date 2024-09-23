const express = require("express");
const taskRouter = express.Router();
const taskModel = require("../models/taskModel");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

taskRouter.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "user"),
  async (req, res) => {
    try {
      const data = await taskModel.find();
      return res.send({ data });
    } catch (err) {
      console.log(err);
      return res.send({ message: "error fetching tasks" });
    }
  }
);

taskRouter.post("/add", async (req, res) => {
  const newTask = req.body;
  try {
    const task = new taskModel(newTask);
    await task.save();
    return res.send({ task });
  } catch (err) {
    console.log(err);
    return res.send({ message: "error adding tasks" });
  }
});

taskRouter.patch("/update/:title", async (req, res) => {
  const title = req.params.title;
  const { status } = req.body;
  try {
    const task = await taskModel.findOneAndUpdate(
      { title: title },
      { $set: { status: status } },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.send({ task });
  } catch (err) {
    console.log(err);

    return res.send({ message: "error updating tasks" });
  }
});

taskRouter.delete("/delete/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const task = await taskModel.findOneAndDelete({ title: title });

    if (!task) {
      return res.status(404).send({ message: "error while deleting" });
    }

    return res.send({ message: "deleted" });
  } catch (err) {
    console.log(err);

    return res.send({ message: "error updating tasks" });
  }
});

module.exports = taskRouter;
