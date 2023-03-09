import Button from "../components/Button";
import InputText from "../components/InputText";
import ConnectionError from "../notifications/ConnectionError";
import { REGISTER } from "../services/requests/requests";

export default class RegistrationScene extends Phaser.Scene {
  constructor() {
    super("RegistrationScene");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.login = null;
    this.password = null;
    this.nick = null;
    this.skin = `dudeSkin2`;
    this.isAccountCreated = false;

    this.addBackground();
    this.addRegistrationWindow();
    this.addLoginInputText();
    this.addPasswordInputText();
    this.addNickInputText();
    this.addSkinsToChoose();

    this.addRegistrateButton();
    this.addBackButton();
  }

  addBackground() {
    this.background = this.add.image(this.gw / 2, this.gh / 2, "guiBackground");
  }

  addRegistrationWindow() {
    this.registrationWindow = this.add.image(
      this.gw / 2,
      this.gh / 2,
      "registration"
    );
  }

  addLoginInputText() {
    let x = this.registrationWindow.x;
    let y = this.registrationWindow.y - 90;

    const inputText = new InputText(this, x, y, "text");

    inputText.text.on("textchange", ({ text }) => {
      this.login = text;
      this.loginAvailableInfo.setVisible(false);
    });

    this.addLoginAvailable(x, y);
  }

  addPasswordInputText() {
    let x = this.registrationWindow.x;
    let y = this.registrationWindow.y - 20;

    const inputText = new InputText(this, x, y, "password");

    inputText.text.on("textchange", ({ text }) => {
      this.password = text;
    });
  }

  addNickInputText() {
    let x = this.registrationWindow.x;
    let y = this.registrationWindow.y + 50;

    const inputText = new InputText(this, x, y, "text");

    inputText.text.on("textchange", ({ text }) => {
      this.nick = text;
      this.nickAvailableInfo.setVisible(false);
    });

    this.addNickUnavailable(x + 250, y);
  }

  addSkinsToChoose() {
    let x = this.registrationWindow.x;
    let y = this.registrationWindow.y;

    this.addCharacters(x, y);
  }

  addCharacters(x, y) {
    for (let i = 0; i <= 1; i++) {
      let character = this.add
        .sprite(80 * i + x - 40, y + 115, `dudeSkin${i + 1}`)
        .setScale(0.4)
        .setInteractive();

      character.on("pointerdown", () => {
        this.chooseFrame.setPosition(
          character.x + this.chooseFrame.width / 2 - 20,
          character.y + this.chooseFrame.height / 2 - 20,
          this.chooseFrame.setVisible(true)
        );

        switch (i) {
          case 0:
            this.skin = `dudeSkin1`;
            break;
          case 1:
            this.skin = `dudeSkin2`;
            break;
        }
      });
    }

    this.addChooseFrame();
  }

  addRegistrateButton() {
    const button = new Button(
      this,
      this.registrationWindow.x,
      this.registrationWindow.y + 200,
      "loginButton"
    )
      .setScale(1.3)
      .setAlpha(0.1);

    button.pointerOver(() => {
      button.setAlpha(1);
    });

    button.pointerOut(() => {
      button.setAlpha(0.1);
    });

    button.onClick(() => {
      if (
        this.login === null ||
        this.password === null ||
        this.nick === null ||
        this.isAccountCreated === true
      )
        return;
      this.isAccountCreated = true;
      this.handleRegister();
    });
  }

  addBackButton() {
    const button = new Button(
      this,
      this.registrationWindow.x + 138,
      this.registrationWindow.y - 188,
      "x"
    );

    button.onClick(() => {
      if (this.isAccountCreated) return;
      this.startMenuScene();
    });
  }

  addChooseFrame() {
    this.chooseFrame = this.add
      .image(this.background.x + 30, this.background.y + 60, "chooseFrame")
      .setScale(1.4)
      .setVisible(false);
  }

  async handleRegister() {
    const { login, password, nick, skin } = this;

    const data = await (await REGISTER({ login, password, nick, skin })).json();

    data.success
      ? this.accountSuccess()
      : data.login === false
      ? (this.loginUnavailable(), (this.isAccountCreated = false))
      : data.nick === false
      ? (this.nickAvailableInfo.setVisible(true),
        (this.isAccountCreated = false))
      : null;
  }

  OKButton(value) {
    const button = this.add.image(value.x, value.y + 30, "ok").setInteractive();

    button.on("pointerdown", () => {
      value.destroy();
      button.destroy();
      this.startMenuScene();
    });
  }

  accountSuccess() {
    console.log("Account created successfully");
    this.isAccountCreated = true;
    const info = this.add.image(this.gw / 2, 60, "accSucInf");
    this.OKButton(info);
  }

  loginUnavailable() {
    this.loginAvailableInfo.setVisible(true);
  }

  addNickUnavailable(x, y) {
    const text = "Nick not available";

    this.nickAvailableInfo = addText(this, x, y, text)
      .setOrigin(0.5, 0.5)
      .setVisible(false);
  }

  addLoginAvailable(x, y) {
    console.log("Login is not available");
    const text = "Login not available";

    this.loginAvailableInfo = addText(this, x, y, text)
      .setOrigin(0.5, 0.5)
      .setVisible(false);
  }

  startMenuScene() {
    this.isAccountCreated = false;
    this.scene.restart();
    this.scene.switch("LoginScene");
  }

  addLostConnectionText() {
    this.connectionError = new ConnectionError(this);
  }
}

function addText(scene, x, y, text) {
  return scene.add.text(x + 250, y, text, {
    fontFamily: "Arial",
    fontSize: "20px",
    color: "#FF0000",
    strokeThickness: 0,
    shadow: { blur: 0, stroke: false, fill: false },
  });
}
