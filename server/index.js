// import { Server } from "socket.io";
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
const { Socket } = require("dgram");
const port = 3000;

// console.log(path.join(__dirname));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//!............................Middle Ware................................
app.use(express.static(path.resolve("../client")));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

// io.on('connection',(socket)=>{
//     socket.on("mgs",(input_value)=>{
//         console.log(input_value);
//         io.emit("mage","i know about you. i am from backend")
//     })
// })

io.on("connection", (socket) => {
  socket.on("chat", (message) => {
    console.log("chat", message);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
