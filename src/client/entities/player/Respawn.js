export default class Respawn {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.x = x;
    this.y = y;

    this.animationElements = [];
    this.animationElementQuantity = 2;

    this.addAnimSprite();
    this.addStartAnimTween();
  }

  addSpriteElement(i) {
    let resp = this.scene.add
      .sprite(this.x, this.y, this.sprite + `${i}`)
      .setScale(0.1)
      .setAlpha(0);

    if (i === 2) {
      resp.setDepth(101);
    }

    this.animationElements.push(resp);
  }

  addAnimSprite() {
    for (let i = 1; i <= this.animationElementQuantity; i++) {
      this.addSpriteElement(i);
    }
  }

  playAnim() {
    for (let i = 1; i <= this.animationElementQuantity; i++) {
      this.animationElements[i - 1].anims.play(`respawnAnim${i}-move`, true);
    }
  }

  addStartAnimTween() {
    this.scene.tweens.add({
      targets: this.animationElements,
      scale: 1,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.addEndAnimTween();
      },
    });

    this.playAnim();
  }

  addEndAnimTween() {
    this.scene.tweens.add({
      targets: this.animationElements,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.animationElements.forEach((el) => (el.anims.stop(), el.destroy()));
      },
    });
  }
}
