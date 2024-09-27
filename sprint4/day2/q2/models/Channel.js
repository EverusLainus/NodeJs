const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  name: String,
  messages: [{ username: String, text: String }],
});

const channel = mongoose.model("channel", channelSchema);

module.exports = channel;
