export default class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "portal-1");

    this.scene = scene;
    this.x = x;
    this.y = y;

    scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    this.startAnim();
  }

  startAnim() {
    this.anims.play("portal-1-on", true);
  }
}
