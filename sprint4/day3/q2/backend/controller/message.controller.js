const messageModel = require("../models/message.model");

const getMessage = async (req, res) => {
  try {
    const message = await messageModel.find().sort({ timestamp: 1 });
    res.status(200).json({ message: message });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const saveMessages = async (data) => {
  try {
    const message = new messageModel({
      userName: data.userName,
      message: data.content,
    });
    await message.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getMessage,
  saveMessages,
};
