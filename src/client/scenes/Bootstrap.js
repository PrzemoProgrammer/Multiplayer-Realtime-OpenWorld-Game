import Server from "../services/Server";
import { BOOTSTRAP_SCENE } from "./scenes";

export default class BootstrapScene extends Phaser.Scene {
  constructor() {
    super("BootstrapScene");
  }

  async create() {
    BOOTSTRAP_SCENE.setScene(this);
    this.server = new Server();
    this.gameData = await this.server.getGameData();

    this.start();
  }

  async start() {
    this.createHUD();
    await this.createPlayScene();
    this.server.handlePlayerJoinListeners();
  }

  createPlayScene() {
    this.scene.launch("PlayScene", {
      gameData: this.gameData,
      server: this.server,
    });
  }

  createHUD() {
    this.scene.launch("HudScene", {
      server: this.server,
    });
  }
}
