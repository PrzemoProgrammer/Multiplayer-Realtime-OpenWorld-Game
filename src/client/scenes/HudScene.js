import { HUD_SCENE } from "./scenes";
import Chat from "../Chat";
import { GAME_SIZE } from "../gameConfig";

export default class HudScene extends Phaser.Scene {
  constructor() {
    super("HudScene");
  }

  create({ server }) {
    HUD_SCENE.setScene(this);
    this.server = server;
    this.gw = GAME_SIZE.WIDTH;
    this.gh = GAME_SIZE.HEIGHT;

    this.chat = new Chat(this, 0, GAME_SIZE.HEIGHT);

    this.addScreenShadow();
  }

  update() {}

  addScreenShadow() {
    const shadow = this.add
      .image(this.gw / 2, this.gh / 2, "shadowScreenFrame")
      .setDisplaySize(this.gw, this.gh);
  }

  newChatMessage(data) {
    this.chat.addTextToConversation(data);
  }

  sendChatMessage() {
    this.chat.manageChat(() => {
      const message = this.chat.getWrittenSentence();
      console.log(message);
      this.server.sendAction({
        action: "newChatMessage",
        value: message,
      });
    });
  }

  restartScene() {
    console.log("restarting HUDSCENE");
    this.scene.restart();
  }
}
