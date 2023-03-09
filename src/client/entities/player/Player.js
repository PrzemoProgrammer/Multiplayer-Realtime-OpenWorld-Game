import Respawn from "./Respawn";

export default class Player {
  constructor(scene, config) {
    this.scene = scene;
    this.x = config.position.x;
    this.y = config.position.y;
    this.sprite = config.stats.skin;
    this.nick = config.nick;
    this.speed = config.stats.moveSpeed;
    this.playerFlipX = false;

    this.lastUpdateTime = Date.now();
    this.prevX = 0;
    this.prevY = 0;

    this.character = this.scene.add.sprite(0, 0, this.sprite);
    this.shade = this.scene.add.image(0, 60, "playerShade");
    this.nick = this.addText();

    this.container = this.scene.add
      .container(this.x, this.y, [this.shade, this.character, this.nick])
      .setAlpha(0);

    this.setupContainer();
    this.setupContainerBody();

    this.addRespawnAnimation();
  }

  addText() {
    return this.scene.add
      .text(this.character.x, this.character.y - 60, this.nick, {
        fontFamily: "LuckyGuy",
        fontSize: "25px",
        color: "#FFFFFF",
        stroke: "##000000",
        strokeThickness: 5,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);
  }

  moveLeft() {
    this.playerFlipX = false;
    this.container.x -= this.speed;
    // this.container.body.setVelocityX(-160);
    // this.character.anims.play(this.sprite + "-left", true);
    this.playAnim("-left");
  }

  moveRight() {
    this.playerFlipX = true;
    this.container.x += this.speed;
    // this.container.body.setVelocityX(160);
    // this.character.anims.play(this.sprite + "-right", true);
    this.playAnim("-right");
  }

  moveUp() {
    this.container.y -= this.speed;
    const direction = this.getPlayerDirection();
    // this.character.anims.play(this.sprite + direction, true);
    this.playAnim(direction);
  }

  moveDown() {
    this.container.y += this.speed;
    const direction = this.getPlayerDirection();
    // this.character.anims.play(this.sprite + direction, true);
    this.playAnim(direction);
  }

  idle() {
    // this.container.body.setVelocityX(0);
    // this.character.anims.play(this.sprite + "-turn", true);
    this.playAnim("-turn");
  }

  getHurt() {
    this.character.setTint(0xff0000);
    // this.character.anims.play(this.sprite + "-turn", true);
    this.playAnim("-turn");
  }

  setPosition(x, y) {
    this.container.x = x;
    this.container.y = y;
  }

  playAnim(value) {
    this.character.play(this.sprite + value, true);
  }

  isPlayerFlipped() {
    return this.playerFlipX;
  }

  getPositionX() {
    return this.getPosition().x;
  }

  getPositionY() {
    return this.getPosition().y;
  }

  getPosition() {
    return { x: this.container.x, y: this.container.y };
  }

  destroy() {
    this.container.destroy();
  }

  addAppearTween() {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 1500,
    });
  }

  addRespawn() {
    this.respawn = new Respawn(
      this.scene,
      this.x,
      this.y + 15,
      "respawnAnim",
      2
    );
  }

  getPlayerDirection() {
    return this.playerFlipX ? "-right" : "-left";
  }

  addRespawnAnimation() {
    this.addRespawn();
    this.addAppearTween();
  }

  setupContainerBody() {
    // this.container.body.setBounce(0.2);
    this.container.body.setCollideWorldBounds(true);
    this.container.body.height = 40;
    this.container.body.width = 30;
    this.container.body.offset.x = 2;
    this.container.body.offset.y = 10;
  }

  setupContainer() {
    this.scene.physics.world.enableBody(this.container);

    this.container.setSize(
      this.character.displayWidth,
      this.character.displayHeight
    );
  }

  updateDepth() {
    this.container.setDepth(this.container.body.y + this.container.body.height);
  }

  getBody() {
    return this.container;
  }
}
