export default class Text {
  constructor(scene, x, y, text) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.textConfig = this.addTextConfig();

    this.text = this.scene.add.text(
      this.scene,
      this.x,
      this.y,
      text,
      this.textConfig
    );
  }

  addTextConfig() {
    return {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "##000000",
      // stroke: "#000000",
      strokeThickness: 0,
      shadow: { blur: 0, stroke: false, fill: false },
    };
  }
}
