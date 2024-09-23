const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  status: {
    type: String,
    enum: ["to-do", "in progress", "done"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
});

const taskModel = model("task", taskSchema);

module.exports = taskModel;
