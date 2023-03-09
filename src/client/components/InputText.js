export default class InputText {
  constructor(scene, x, y, type) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;

    this.addText(this.x, this.y);
  }

  addBox() {
    this.box = this.scene.add
      .rexNinePatch({
        x: this.text.x,
        y: this.text.y - 5,
        width: 300,
        height: 60,
        key: "inputBox",
        columns: [15, undefined, 15],
        rows: [10, undefined, 10],
      })
      .setDepth(100);
  }

  addText(x, y) {
    this.config = {
      x: x,
      y: y,
      width: 150,
      height: 30,
      type: this.type,
      placeholder: "",
      fontSize: "20px",
      fontFamily: "Arial",
      color: "#ffffff",
      align: "center",
      maxLength: 12,
      minLength: 0,
    };

    this.text = this.scene.add.rexInputText(this.config);
    // .resize(150, 30);
  }

  onText() {
    this.text.on("textchange", ({ text }) => {
      this.login = text;
    });
  }

  setMaxLength(value) {
    this.text.maxLength = value;
  }

  setPlaceholder(text) {
    this.text.placeholder = text;
  }
}
