import { User } from "./models/user.js";

const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("ui"));

io.on("connection", (socket) => {
  socket.broadcast.emit("user connect");

  socket.on("disconnect", (user) => {
    io.emit("user disconnect");
  });
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("typing", (nickname) => {
    socket.broadcast.emit("typing", nickname);
  });
});

server.listen(3000, () => {
  console.log("listening on*:3000");
});
