import HandleInputs from "../utils/HandleInputs";
import Player from "../entities/player/Player";
import Players from "../entities/Players";
import CameraManager from "../utils/cameraManager";
import mapsConfig from "../../shared/config/maps/index";
import { PLAY_SCENE } from "./scenes";
import World from "../world/WorldManager";
import maps from "../../shared/data/maps";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  async create({ gameData, server }) {
    PLAY_SCENE.setScene(this);
    // this.hudScene = HUD_SCENE.SCENE;

    this.server = server;
    this.gameData = gameData;
    this.worldConfig = this.getWorldConfig(this.gameData.map);
    this.playerConfig = this.getPlayerConfig(this.gameData.players);

    this.world = new World(this, this.worldConfig);
    this.player = new Player(this, this.playerConfig);
    this.players = new Players(this, this.gameData.players);

    this.addHandleInputs();
    this.setCameraWorld();
  }

  update() {
    this.updateDepth();
    this.handleInputs.update();
  }

  getWorldConfig(data) {
    const mapsConfigToArray = Object.values(mapsConfig);
    return mapsConfigToArray.find((map) => map.texture === data);
  }

  getPlayerConfig(playersData) {
    let playerConfig = null;
    for (let player in playersData) {
      if (this.server.isMyId(player)) playerConfig = playersData[player];
    }
    return playerConfig;
  }

  addHandleInputs() {
    this.handleInputs = new HandleInputs(this);
  }

  setCameraWorld() {
    this.camera = new CameraManager(this);
    const player = this.player.container;
    const mapW = this.world.getWidth();
    const mapH = this.world.getHeight();

    this.camera.follow(player);
    this.camera.setBounds(mapW, mapH);
  }

  //! /////////////////////////////////////////////////////////////////////////

  sendPlayerDirection(direction) {
    this.server.sendAction({
      action: "sendPlayerDirection",
      value: direction,
    });
  }

  updatePlayersPosition(data) {
    const localPlayerID = this.server.getPlayerId();
    this.players.updatePlayersPosition(localPlayerID, data);
  }

  addNewPlayer(data) {
    this.players.addPlayer(data);
  }

  playerDisconnect(playerId) {
    this.players.removePlayer(playerId);
    localStorage.clear();
  }

  usePortal(gameState) {
    this.handleInputs.removeListeners();

    console.log("usingPortal");
    this.scene.restart({
      gameData: gameState,
      server: this.server,
    });
  }

  updateDepth() {
    this.players.updateDepth();
    this.player.updateDepth();
  }

  // sortScores() {
  //   const players = this.otherPlayerToArray();

  //   for (let i = 0; i <= players.length - 1; i++) {
  //     players[i].scoreText.text.y = 48 + i * 32;
  //   }
  // }

  // otherPlayerToArray() {
  //   return Object.values(this.players);
  // }
}

//! ZMIENIC WYSYŁANIE MAPY NA ID
//! TILE MAPE SPRAWDZIĆ
//! ZAWIJANIE TEKSTU NA CHACIE JAK JEST ZA DŁUGI
//! SUWAK CHATU
//! SPINE ANIMATIONS SPRAWDZIĆ
