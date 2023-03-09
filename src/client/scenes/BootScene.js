export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.setPath("./src/client/assets");
    this.load.image("loadingBar", "loadingBar.png");
    this.load.image("loadingContainer", "loadingContainer.png");
    this.load.image("guiBackground", "guiBackground.png");
  }

  create() {
    this.scene.start("PreloadScene");
  }
}
