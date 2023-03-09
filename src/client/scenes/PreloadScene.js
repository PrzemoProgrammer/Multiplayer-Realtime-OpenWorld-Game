import Loading from "../utils/LoadingScreen";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.createLoadingScreen();
    this.load.setPath("./src/client/assets");
    this.load.image("city-map", "city-map.png");
    this.load.image("castle-map", "castle-map.png");
    this.load.image("inputBox", "inputBox.png");
    this.load.image("loginButton", "loginButton.png");
    this.load.image("signUpButton", "signUpButton.png");
    this.load.image("chooseFrame", "chooseFrame.png");
    this.load.image("loginError", "loginError.png");
    this.load.image("accSucInf", "accSucInf.png");
    this.load.image("ok", "ok.png");
    this.load.image("login", "login.png");
    this.load.image("registration", "registration.png");
    this.load.image("x", "x.png");
    this.load.image("playerShade", "playerShade.png");
    this.load.image("shadowScreenFrame", "shadowScreenFrame.png");
    this.load.image("okButton", "okButton.png");
    this.load.image("dimmingScreen", "dimmingScreen.png");
    this.load.image("noConnectionWindow", "noConnectionWindow.png");
    this.load.image("castle", "castle.png");
    this.load.image("chatBox", "chatBox.png");
    this.load.image("chatEnterButton", "chatEnterButton.png");
    this.load.image("chatTextBox", "chatTextBox.png");
    this.load.image("chatMask", "chatMask.png");

    this.load.spritesheet("portal-1", "portal-1.png", {
      frameWidth: 960 / 5,
      frameHeight: 576 / 3,
    });

    for (let i = 1; i <= 2; i++) {
      this.load.spritesheet(`dudeSkin${i}`, `dudeSkin${i}.png`, {
        frameWidth: 718 / 9,
        frameHeight: 120,
      });
    }

    for (let i = 1; i <= 2; i++) {
      this.load.spritesheet(`respawnAnim${i}`, `respawnAnim${i}.png`, {
        frameWidth: 943 / 5,
        frameHeight: 377 / 2,
      });
    }

    this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );
    this.load.plugin(
      "rexninepatchplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexninepatchplugin.min.js",
      true
    );

    //   this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.addPlayerAnims();
    this.addRespawnAnim();
    this.addPortalAnim();
  }

  addPlayerAnims() {
    for (let i = 1; i <= 2; i++) {
      this.anims.create({
        key: `dudeSkin${i}-left`,
        frames: this.anims.generateFrameNumbers(`dudeSkin${i}`, {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: `dudeSkin${i}-turn`,
        frames: [{ key: `dudeSkin${i}`, frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: `dudeSkin${i}-right`,
        frames: this.anims.generateFrameNumbers(`dudeSkin${i}`, {
          start: 5,
          end: 8,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  addRespawnAnim() {
    for (let i = 1; i <= 2; i++) {
      this.anims.create({
        key: `respawnAnim${i}-move`,
        frames: this.anims.generateFrameNumbers(`respawnAnim${i}`, {
          start: 0,
          end: 9,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  addPortalAnim() {
    this.anims.create({
      key: "portal-1-on",
      frames: this.anims.generateFrameNumbers("portal-1", {
        start: 0,
        end: 14,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createLoadingScreen() {
    this.loadingScreen = new Loading(this);
    this.loadingScreen.onComplete(() => {
      this.loadingScreen.destroy();
      this.scene.start("LoginScene");
    });
  }
}
