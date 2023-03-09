import Button from "../components/Button";
import { VIEWPORT_SIZE } from "../../shared/config/gameConfig";

export default class ConnectionError {
  constructor(scene) {
    this.scene = scene;

    this.screen = this.scene.add.image(
      VIEWPORT_SIZE.WIDTH / 2,
      VIEWPORT_SIZE.HEIGHT / 2,
      "dimmingScreen"
    );
    this.window = this.scene.add.image(
      this.screen.x,
      this.screen.y,
      "noConnectionWindow"
    );

    this.button = new Button(
      this.scene,
      this.window.x,
      this.window.y + 100,
      "okButton"
    );

    this.addRemove();
  }

  addRemove() {
    this.button.onClick(() => {
      this.screen.destroy();
      this.window.destroy();
      this.button.destroy();
    });
  }
}
