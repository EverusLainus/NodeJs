const express = require("express");
const taskRouter = express.Router();
const taskModel = require("../models/taskModel");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     responses:
 *       200:
 *         description: Successfully fetched tasks
 *       500:
 *         description: Error fetching tasks
 */
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

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task added successfully
 *       500:
 *         description: Error adding task
 */
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

/**
 * @swagger
 * /tasks/update/:title:
 *   post:
 *     summary: Update a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       500:
 *         description: Error updating task
 */

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

/**
 * @swagger
 * /tasks/delete/:title:
 *   post:
 *     summary: delete a  task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       500:
 *         description: Error deleting task
 */

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
