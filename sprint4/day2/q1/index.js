const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const allUsers = [];

const room1 = [];
const room2 = [];

app.get("/", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("All Users: ", allUsers);
  console.log("a user connected", socket.id);
  if (!allUsers.includes(socket.id)) {
    allUsers.push(socket.id);
  }

  socket.on("chat message", (msg) => {
    console.log("message:" + msg + " " + socket.id);
    io.emit("chat message", msg);
    console.log("send:", msg);
  });

  socket.on("joinroom", (msg) => {
    console.log("join room: ", msg);
    socket.join(msg);
    io.sockets.in(msg).emit("new_msg", { msg: "hello" });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
