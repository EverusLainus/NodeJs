const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  completedAt: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const taskModel = model("task", taskSchema);

module.exports = taskModel;
