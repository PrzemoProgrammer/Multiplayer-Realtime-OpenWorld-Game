import { PLAY_SCENE, HUD_SCENE } from "../scenes/scenes";
import io from "socket.io-client";
import { SERVER_URL } from "./config";

export default class Server {
  constructor() {
    this.socket = io(`${SERVER_URL}`);
    this.client = this.socket;
    this.playerId = "";

    this.token = localStorage.getItem("token");

    this.setWorldListeners();

    this.client.on("connect", () => {
      this.playerId = this.client.id;
      this.client.emit("getGameState", this.token);
    });
  }

  async getGameData() {
    return new Promise((resolve) => {
      this.client.on("getGameState", (playersData) => {
        resolve(playersData);
      });
    });
  }

  getPlayerId() {
    return this.playerId;
  }

  isMyId(id) {
    return this.playerId === id;
  }

  joinWorld() {
    // join any socket io room here
  }

  setPlayerID(id) {
    this.playerId = id;
  }

  setWorldListeners() {
    this.client.on("playerDisconnect", (data) => {
      PLAY_SCENE.SCENE.playerDisconnect(data);
    });

    this.client.on("newPlayer", (data) => {
      PLAY_SCENE.SCENE.addNewPlayer(data);
    });

    this.client.on("usePortal", (data) => {
      PLAY_SCENE.SCENE.usePortal(data);
    });

    this.client.on("newChatMessage", (data) => {
      HUD_SCENE.SCENE.newChatMessage(data);
    });
  }

  handlePlayerJoinListeners() {
    this.client.on("updatePlayersPosition", (data) => {
      PLAY_SCENE.SCENE.updatePlayersPosition(data);
    });
  }

  sendAction(data) {
    this.client.emit(data.action, data.value);
  }

  getToken() {
    return this.token;
  }

  isConnected() {}
}
