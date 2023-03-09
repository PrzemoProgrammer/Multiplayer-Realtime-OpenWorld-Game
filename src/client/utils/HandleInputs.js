import { HUD_SCENE } from "../scenes/scenes";

export default class HandleInputs {
  constructor(scene) {
    this.scene = scene;
    // this.keyRight = this.scene.input.keyboard.addCapture(39);

    this.keys = this.scene.input.keyboard.addKeys({
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    });

    this.keyEnter = this.scene.input.keyboard.addKey("ENTER");

    this.init();
  }

  update() {
    this.handleMovement();
  }

  init() {
    this.handleKeyUp();
    this.initEnterKey();
  }

  removeListeners() {
    this.scene.input.keyboard.removeAllKeys(true);
  }

  handleMovement() {
    if (this.scene.gameOver) return;

    if (this.keys.up.isDown) {
      this.scene.sendPlayerDirection("up");
      this.scene.player.moveUp();
    }
    if (this.keys.down.isDown) {
      this.scene.sendPlayerDirection("down");
      this.scene.player.moveDown();
    }
    if (this.keys.left.isDown) {
      this.scene.sendPlayerDirection("left");
      this.scene.player.moveLeft();
    }
    if (this.keys.right.isDown) {
      this.scene.sendPlayerDirection("right");
      this.scene.player.moveRight();
    }
  }

  initEnterKey() {
    this.keyEnter.on("down", () => {
      console.log("Click Enter");
      HUD_SCENE.SCENE.sendChatMessage();
    });
  }

  handleKeyUp() {
    this.scene.input.keyboard.on("keyup-UP", () => {
      this.onKeyUp("UP");
    });

    this.scene.input.keyboard.on("keyup-DOWN", () => {
      this.onKeyUp("DOWN");
    });

    this.scene.input.keyboard.on("keyup-RIGHT", () => {
      this.onKeyUp("RIGHT");
    });

    this.scene.input.keyboard.on("keyup-LEFT", () => {
      this.onKeyUp("LEFT");
    });
  }

  onKeyUp(key) {
    // if (!this.scene.player.canMove) return;

    // if (key === "LEFT") {
    // }
    this.scene.player.idle();
  }
}
