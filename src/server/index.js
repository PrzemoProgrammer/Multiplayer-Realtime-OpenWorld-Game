const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const { SERVER_PORT } = require("../shared/config/gameConfig");
const port = process.env.PORT || SERVER_PORT;
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/../../`));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

module.exports = {
  server,
  app,
  port,
  io,
};
