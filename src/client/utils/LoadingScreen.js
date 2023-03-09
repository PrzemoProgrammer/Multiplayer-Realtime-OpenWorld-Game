export default class Loading {
  constructor(scene) {
    this.scene = scene;

    this.addBackground();
    this.addProgressBar();
    this.addProgressContainer();

    const progressBarWidth = this.progressBar.displayWidth;

    this.scene.load.on("progress", (value) => {
      this.progressBar.displayWidth = progressBarWidth * value;
    });
  }

  addBackground() {
    this.background = this.scene.add.image(
      this.scene.game.config.width / 2,
      this.scene.game.config.height / 2,
      "guiBackground"
    );
  }

  addProgressBar() {
    this.progressBar = this.scene.add.image(
      this.scene.game.config.width / 2,
      this.scene.game.config.height / 2,
      "loadingBar"
    );
  }

  addProgressContainer() {
    this.progressContainer = this.scene.add.image(
      this.progressBar.x,
      this.progressBar.y - 20,
      "loadingContainer"
    );
  }

  onComplete(callback) {
    this.scene.load.on("complete", () => {
      callback();
    });
  }

  destroy() {
    this.progressContainer.destroy();
    this.progressBar.destroy();
    this.background.destroy();
  }
}
