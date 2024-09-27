const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

const Channel = require("./models/Channel");

const app = express();
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        connectSrc: ["'self'", "ws:"],
      },
    },
  })
);

mongoose.connect("mongodb://localhost:27017/chat");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  sendChannelsList(socket);

  socket.on("createChannel", async (channelName) => {
    const existingChannel = await Channel.findOne({ name: channelName });
    if (!existingChannel) {
      const newChannel = new Channel({ name: channelName, messages: [] });
      await newChannel.save();
    }
    sendChannelsList(io);
  });

  socket.on("joinChannel", async (channelName) => {
    socket.join(channelName);
    const channel = await Channel.findOne({ name: channelName });
    if (channel) {
      socket.emit("channelMessages", channel.messages);
    }
  });

  socket.on("message", async ({ channel, text }) => {
    const username = socket.id;
    const channelData = await Channel.findOne({ name: channel });
    channelData.messages.push({ username, text });
    await channelData.save();
    io.to(channel).emit("message", { username, text });
  });
});

async function sendChannelsList(emitter) {
  const channels = await Channel.find();
  emitter.emit("channelList", channels);
}

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
