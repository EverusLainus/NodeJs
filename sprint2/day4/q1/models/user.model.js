const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified || this.isNew) {
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.method.comparePassword = function (newPassword) {
  return bcrypt.compare(newPassword, this.password);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
