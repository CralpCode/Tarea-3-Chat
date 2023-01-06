const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const http = require("http");
const initserver = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(initserver);
const path = require('path');

app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.static(__dirname));

/* app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}) */

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);
  socket.on("chat:message", (newchat) => {
    console.log(newchat);
    io.emit("server:chat", newchat);
  });
});

initserver.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
