const { io } = require("../index");

class HandleResponse {
  constructor() {}

  getGameState(socket, data) {
    toSender(socket, "getGameState", data);
  }

  newPlayer(socket, data, room) {
    if (!room) toAllNotSender(socket, "newPlayer", data);
    else {
      toAllInRoom(room, "newPlayer", data);
    }
  }

  playerDisconnect(data, room) {
    if (!room) toAll("playerDisconnect", data);
    else {
      toAllInRoom(room, "playerDisconnect", data);
    }
  }

  usePortal(socket, data) {
    toSenderUsingID(socket, "usePortal", data);
  }

  newChatMessage(room, data) {
    toAllInRoom(room, "newChatMessage", data);
  }

  updatePlayersPosition(data) {
    toAll("updatePlayersPosition", data);
  }
}

function toSender(socket, message, data) {
  socket.emit(message, data);
}

function toSenderUsingID(id, message, data) {
  io.to(id).emit(message, data);
}

function toAllNotSender(socket, message, data) {
  socket.broadcast.emit(message, data);
}

function toAllNotSender(socket, message, data) {
  socket.broadcast.emit(message, data);
}

function toAll(message, data) {
  io.emit(message, data);
}

function toAllInRoom(room, message, data) {
  io.to(room).emit(message, data);
}

module.exports = HandleResponse;
