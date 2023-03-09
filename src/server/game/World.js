const Players = require("../game/entity/character/Players");
const HandleResponse = require("./HandleResponse");
const checkWorldBounceCollision = require("./collisions/checkWorldBounceCollision");
const maps = require("../../shared/data/maps");
const checkPortalCollision = require("./collisions/checkPortalCollision.js.js");
const { io } = require("../index");

class World {
  constructor(database) {
    this.io = io;
    this.database = database;
    this.players = new Players();
    this.handleResponse = new HandleResponse();
  }

  async getGameState({ socket, accountManager, token }) {
    let playerID = socket.id;
    try {
      const decoded = accountManager.verifyToken(token);
      const playerData = await this.database.downloadPlayer({
        nick: decoded,
      });
      playerData.ID = playerID;
      playerData.active = true;

      socket.join(playerData.map);

      this.players.addPlayer(playerData);

      const gameData = {
        map: playerData.map,
        players: this.players.getPlayers(),
      };

      const player = this.players.getPlayer(playerID);

      this.handleResponse.getGameState(socket, gameData);
      this.handleResponse.newPlayer(socket, player);
    } catch (error) {
      console.error(error);
    }
  }

  sendPlayerDirection(socket, direction) {
    const id = socket.id;
    this.players.updateNextMoves({ id, direction });
  }

  disconnect(socket) {
    let playerID = socket.id;
    const player = this.players.getPlayer(playerID);

    const { nick, stats, position, map } = player;
    const { lvl, skin, moveSpeed, attack } = stats;
    const { speed: attackSpeed, dmg: attackDmg } = attack;

    const updatedPlayerData = {
      nick,
      stats: {
        lvl,
        skin,
        moveSpeed,
        attack: { speed: attackSpeed, dmg: attackDmg },
      },
      position: { x: position.x, y: position.y },
      map,
    };

    socket.leave(player.map);

    this.database.updatePlayer(updatedPlayerData);
    this.players.removePlayer(playerID);

    this.handleResponse.playerDisconnect(playerID);
  }

  newChatMessage(socket, message) {
    const id = socket.id;
    const room = this.players.getPlayerMap(id);
    const data = {
      nick: this.players.getPlayerNick(id),
      text: message,
    };

    this.handleResponse.newChatMessage(room, data);
  }

  async updatePlayersPosition() {
    for (const playerId in this.players.getNextMoves()) {
      const calculatedNextPosition =
        this.players.calculateNextPosition(playerId);

      if (checkWorldBounceCollision(calculatedNextPosition)) {
        continue;
      }

      const playerMap = this.players.getPlayer(playerId).map;

      const isTouchingPortal = checkPortalCollision(
        playerMap,
        calculatedNextPosition
      );
      if (isTouchingPortal) {
        console.log(isTouchingPortal);
        const newMap = maps[isTouchingPortal];
        const socket = this.io.sockets.sockets.get(playerId);
        const playerPreviousMap = this.players.getPlayerMap(playerId);

        socket.leave(playerPreviousMap);
        socket.join(newMap.name);

        this.players.changePlayerMap(playerId, newMap);
        this.players.updatePlayerPosition(playerId, newMap.startingPoint);

        const playersInRoom = {};
        const sockets = await this.io.in(newMap.name).fetchSockets();

        sockets.forEach((socket) => {
          const player = this.players.getPlayer(socket.id);
          if (socket.id === player.ID) {
            playersInRoom[socket.id] = player;
          }
        });

        const gameData = {
          map: newMap.name,
          players: playersInRoom,
        };

        this.handleResponse.usePortal(playerId, gameData);
        this.handleResponse.newPlayer(
          socket,
          this.players.getPlayer(playerId),
          newMap.name
        );

        this.handleResponse.playerDisconnect(playerId, playerPreviousMap);
        break;
      }
      this.players.updatePlayerPosition(playerId, calculatedNextPosition);
    }
    const playersUpdatedPositions = this.players.getUpdatedPlayersPositions();
    this.handleResponse.updatePlayersPosition(playersUpdatedPositions);
  }
}

module.exports = World;
