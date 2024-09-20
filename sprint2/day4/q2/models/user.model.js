const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: Sting,
  email: String,
  password: String,
});

userSchema.pre("save", async function (next) {
  if (this.isModified || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userModel.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = model("user", userSchema);

module.exports = userModel;
