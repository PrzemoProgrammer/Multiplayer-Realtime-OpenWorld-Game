export default class CameraManager {
  constructor(scene) {
    this.scene = scene;
  }

  setBounds(w, h) {
    this.scene.cameras.main.setBounds(0, 0, w, h);
    this.scene.physics.world.setBounds(0, 0, w, h);
  }

  follow(object) {
    this.scene.cameras.main.startFollow(
      object,
      false,
      0.5,
      0.5,
      -object.body.width / 2,
      -object.body.height / 2
    );
  }
}
