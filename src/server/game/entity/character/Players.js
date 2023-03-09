// const createPlayer = require("./models/player");

class Players {
  constructor() {
    this.players = {};
    this.playersNextMoves = {};
    this.playersUpdatedPositions = {};
  }

  addPlayer(data) {
    // this.players[data.ID] = createPlayer(data);
    this.players[data.ID] = data;
    this.playersNextMoves[data.ID] = [];
    this.playersUpdatedPositions[data.ID] = {};
  }

  addToRoom() {}

  getPlayer(id) {
    return this.players[id];
  }

  removePlayer(id) {
    delete this.players[id];
    delete this.playersNextMoves[id];
  }

  getPlayers() {
    return this.players;
  }

  getNextMoves() {
    return this.playersNextMoves;
  }

  updateNextMoves({ id, direction }) {
    this.playersNextMoves[id].push(direction);
  }

  getPlayerNextMove(id) {
    return this.playersNextMoves[id];
  }

  changePlayerMap(id, map) {
    this.players[id].map = map.name;
    // this.updatePlayerPosition(id, map.startingPoint);
    this.resetPlayerNextMoves(id);
  }

  getPlayerMap(id) {
    return this.players[id].map;
  }

  resetPlayerNextMoves(id) {
    this.playersNextMoves[id].length = 0;
  }

  isPlayerActive(id) {
    return this.players[id].active;
  }

  setPlayerActive(id, value) {
    this.players[id].active = value;
  }

  getPlayerNick(id) {
    return this.players[id].nick;
  }

  calculateNextPosition(id) {
    const player = this.getPlayer(id);
    const playerNextMove = this.playersNextMoves[id];
    const playerPosition = player.position;
    const playerSpeed = player.stats.moveSpeed;

    let movedX = 0;
    let movedY = 0;

    for (let i = 0; i < playerNextMove.length; i++) {
      if (playerNextMove[i] == "right") {
        movedX += playerSpeed;
      } else if (playerNextMove[i] == "left") {
        movedX -= playerSpeed;
      } else if (playerNextMove[i] == "up") {
        movedY -= playerSpeed;
      } else if (playerNextMove[i] == "down") {
        movedY += playerSpeed;
      }
    }

    const position = {
      x: playerPosition.x + movedX,
      y: playerPosition.y + movedY,
    };

    this.resetPlayerNextMoves(id);

    return position;
  }

  updatePlayerPosition(id, position) {
    const player = this.players[id].position;
    player.x = position.x;
    player.y = position.y;

    this.addToUpdatesPositions(id, position);
  }

  addToUpdatesPositions(id, position) {
    this.playersUpdatedPositions[id] = {
      x: position.x,
      y: position.y,
    };
  }

  getUpdatedPlayersPositions() {
    return this.playersUpdatedPositions;
  }
}

module.exports = Players;
