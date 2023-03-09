import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import PlayScene from "./scenes/PlayScene";
import HudScene from "./scenes/HudScene";
import LoginScene from "./scenes/LoginScene";
import RegistrationScene from "./scenes/RegistrationScene";
import BootScene from "./scenes/BootScene";
import BootstrapScene from "./scenes/Bootstrap";
import { GAME_SIZE } from "./gameConfig";

const config = {
  type: Phaser.AUTO,
  parent: "div",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: 0,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: GAME_SIZE.WIDTH,
    height: GAME_SIZE.HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [
    BootScene,
    PreloadScene,
    LoginScene,
    BootstrapScene,
    RegistrationScene,
    PlayScene,
    HudScene,
  ],
};

const game = new Phaser.Game(config);
