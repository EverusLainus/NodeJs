const express = require("express");
const http = require("http");
const connectDB = require("./config/db.config");
const { Server } = require("socket.io");
const { saveMessages } = require("./controller/message.controller");
const { messageRouter } = require("./routes/message.routes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use("/api/chat", messageRouter);
const server = http.createServer(app);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("chat message", (msg) => {
    console.log("client says: ", msg);
    saveMessages({ userName: msg.userName, content: msg.content });
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

const port = 4000;
server.listen(port, () => {
  connectDB();
  console.log("server at http://localhost:4000");
});
