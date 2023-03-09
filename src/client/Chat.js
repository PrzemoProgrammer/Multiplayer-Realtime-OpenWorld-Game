import Button from "./components/Button";

export default class Chat {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.isActive = false;
    this.isWriting = false;
    this.writtenSentence = "";
    this.messages = [];

    this.messageOffset = 20;
    this.maxScrollRange = 600;
    this.maxMessagesOnChat = 30;
    this.messagesContainerStartY = "";

    this.addBox();
    this.addTextBox();
    this.addEnterButton();
    this.addInput();

    this.createContainer();
    this.createMessagesContainer();
  }

  addBox() {
    this.box = this.scene.add.image(0, 0, "chatBox").setAlpha(0);
  }

  createContainer() {
    this.container = this.scene.add
      .container(
        this.x + this.box.displayWidth / 2,
        this.y - this.box.displayHeight / 2,
        [this.box, this.textBox, this.enterButton]
      )
      .setSize(this.box.displayWidth, this.box.displayHeight)
      .setInteractive();
  }

  createMessagesContainer() {
    this.messagesContainer = this.scene.add.container(
      this.container.x,
      this.container.y
    );

    this.messagesContainerStartY = this.messagesContainer.y;

    this.container.on("wheel", (pointer, dx, dy, dz, event) => {
      if (!this.isActive) return;

      const newY = this.messagesContainer.y + dy * 0.5;
      this.messagesContainer.y = Math.min(
        Math.max(newY, this.messagesContainerStartY),
        this.maxScrollRange
      );
    });

    this.messagesMask = this.scene.make
      .image({
        x: this.container.x,
        y: this.container.y - 25,
        key: "chatMask",
        add: true,
      })
      .setVisible(false);

    this.messagesContainer.mask = new Phaser.Display.Masks.BitmapMask(
      this.scene,
      this.messagesMask
    );
  }

  resetMessagesPosition() {
    this.messagesContainer.y = this.messagesContainerStartY;
  }

  addTextBox() {
    this.textBox = this.scene.add
      .image(
        this.box.x + this.box.displayWidth - 517,
        this.box.y + this.box.displayHeight - 150,
        "chatTextBox"
      )
      .setAlpha(0);
  }

  addEnterButton() {
    this.enterButton = new Button(
      this.scene,
      this.box.x + this.box.displayWidth - 305,
      this.box.y + this.box.displayHeight - 150,
      "chatEnterButton"
    )
      .setAlpha(0)
      .setActive(false);
    this.enterButton.onClick(() => {
      this.manageChat();
    });
  }

  addInput() {
    this.config = {
      x: this.x + 210,
      y: this.y - 25,
      width: 400,
      height: 30,
      type: "text",
      multiline: true,
      placeholder: "Enter text",
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#ffffff",
      align: "left",
      maxLength: 70,
      minLength: 0,
    };

    this.text = this.scene.add
      .rexInputText(this.config)
      .setVisible(false)
      .setActive(false);

    this.text.on("textchange", ({ text }) => {
      this.writtenSentence = text;
    });
  }

  setTextStatus(value) {
    this.text.setVisible(value);
    this.text.setActive(value);
  }

  setEnterButtonStatus(number, value) {
    this.enterButton.setAlpha(number);
    this.enterButton.setActive(value);
  }

  turnOn() {
    this.isActive = true;
    this.setTextStatus(true);
    this.textBox.setAlpha(1);
    this.setEnterButtonStatus(1, true);
    this.box.setAlpha(1);
  }

  turnOff() {
    this.isActive = false;
    this.setTextStatus(false);
    this.box.setAlpha(0);
    this.setEnterButtonStatus(0, false);
    this.textBox.setAlpha(0);
    this.resetMessagesPosition();
  }

  isOpenAndNoWriting() {
    return this.isActive && this.writtenSentence === "";
  }

  isOpenAndWriting() {
    return this.isActive && this.writtenSentence !== "";
  }

  clearTextBox() {
    this.text.setText("");
    this.writtenSentence = "";
  }

  manageChat(cb) {
    if (this.isOpenAndNoWriting()) {
      this.turnOff();
      return;
    }

    if (this.isOpenAndWriting()) {
      if (this.messagesContainerStartY != "") cb();
      this.clearTextBox();
      console.log("send word to server");
    } else {
      this.turnOn();
    }
  }

  getWrittenSentence() {
    return this.writtenSentence;
  }

  addTextMessage(x, y, data) {
    const textConfig = {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#FFFFFF",
      strokeThickness: 1,
      stroke: "#FFFFFF",
      shadow: { blur: 0, stroke: false, fill: false },
    };

    const text = this.scene.add.text(
      x,
      y,
      data.nick + " : " + data.text,
      textConfig
    );
    this.addMessageToMessages(text);
  }

  addMessageToMessages(text) {
    this.messagesContainer.add([text]);
    this.messages.unshift(text);
  }

  addTextToConversation(data) {
    const message = this.messages[0];
    let x = message ? message.x : this.box.x - 250;
    let y = message ? message.y : this.box.y + 50;

    this.messages.map((message) => (message.y -= this.messageOffset));

    this.addTextMessage(x, y, data);

    this.messages.length > this.maxMessagesOnChat
      ? this.messages.pop().destroy()
      : {};

    if (
      this.messages.length >= 9 &&
      this.messages.length !== this.maxMessagesOnChat
    ) {
      this.maxScrollRange += this.messageOffset;
    }
  }

  // sortScores() {
  //   const players = this.otherPlayerToArray();

  //   for (let i = 0; i <= players.length - 1; i++) {
  //     players[i].scoreText.text.y = 48 + i * 32;
  //   }
  // }

  // otherPlayerToArray() {
  //   return Object.values(this.players);
  // }
}
