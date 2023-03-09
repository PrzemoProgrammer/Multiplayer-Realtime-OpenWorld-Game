import Button from "../components/Button";
import InputText from "../components/InputText";
import ConnectionError from "../notifications/ConnectionError";
import { LOGIN } from "../services/requests/requests";

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super("LoginScene");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.login = null;
    this.password = null;

    this.isLoginButtonBLocked = false;

    this.addBackground();
    this.addLoginWindow();
    this.addLoginInputText();
    this.addPasswordInputText();
    this.addLoginButton();
    this.addSignUpButton();
  }

  addBackground() {
    this.background = this.add.image(this.gw / 2, this.gh / 2, "guiBackground");
  }

  addLoginWindow() {
    this.loginWindow = this.add.image(this.gw / 2, this.gh / 2, "login");
  }

  addLoginInputText() {
    this.inputLogin = new InputText(
      this,
      this.loginWindow.x - 78,
      this.loginWindow.y + 20,
      "text"
    );

    this.inputLogin.text.on("textchange", ({ text }) => {
      this.login = text;
    });
  }

  addPasswordInputText() {
    this.inputPassword = new InputText(
      this,
      this.loginWindow.x + 71,
      this.loginWindow.y + 20,
      "password"
    );

    this.inputPassword.text.on("textchange", ({ text }) => {
      this.password = text;
    });
  }

  addLoginButton() {
    const button = new Button(
      this,
      this.loginWindow.x - 5,
      this.loginWindow.y + 125,
      "loginButton"
    ).setAlpha(0.1);

    button.pointerOver(() => {
      button.setAlpha(1);
    });

    button.pointerOut(() => {
      button.setAlpha(0.1);
    });

    button.onClick(() => {
      if (this.fieldsAreFilled()) return;
      this.isLoginButtonBLocked = true;

      this.handleLogin().then(() => {
        this.isLoginButtonBLocked = false;
      });
    });
  }

  addSignUpButton() {
    const button = new Button(
      this,
      this.loginWindow.x - 68,
      this.loginWindow.y - 115,
      "signUpButton"
    );

    button.onClick(() => {
      this.startRegisterScene();
    });
  }

  async handleLogin() {
    const username = this.login;
    const password = this.password;

    const loginToken = await (await LOGIN({ username, password })).json();

    if (loginToken === false) {
      this.accountError();
      return;
    }
    localStorage.setItem("token", loginToken);
    this.startBootstrapScene();
  }

  accountError() {
    console.log("Login failed");
    this.loginError = this.add.image(this.gw / 2, 60, "loginError");

    setTimeout(() => {
      this.loginError.destroy();
    }, 3000);
  }

  startRegisterScene() {
    this.scene.switch("RegistrationScene");
  }

  getAccountID() {
    return this.login + this.password;
  }

  startBootstrapScene() {
    console.log("Login succes");
    this.scene.start("BootstrapScene");
    this.scene.remove("LoginScene");
  }

  fieldsAreFilled() {
    return (
      this.login === null ||
      this.password === null ||
      this.isLoginButtonBLocked === true
    );
  }

  addLostConnectionWindow() {
    this.connectionError = new ConnectionError(this);
  }
}
