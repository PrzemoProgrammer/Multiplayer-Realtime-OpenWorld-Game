import Portal from "./Portal";

export default class World {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;

    this.portals = [];
    this.objects = [];

    this.addBackground();
    this.addObjects();
    this.addPortals();
  }

  addBackground() {
    this.background = this.scene.add
      .image(0, 0, this.config.texture)
      .setOrigin(0, 0);
  }

  addPortals() {
    const portalsData = this.config.portals;

    for (let i = 0; i < portalsData.length; i++) {
      const portalX = portalsData[i].x;
      const portalY = portalsData[i].y;

      let portal = new Portal(this.scene, portalX, portalY);

      this.portals.push(portal);
    }
  }

  addObjects() {
    const objectsData = this.config.objects;

    for (let i = 0; i < objectsData.length; i++) {
      const objectX = objectsData[i].x;
      const objectY = objectsData[i].y;
      const objectTexture = objectsData[i].texture;

      let object = this.scene.add.image(objectX, objectY, objectTexture);
      this.scene.physics.world.enableBody(this);

      this.objects.push(object);
    }
  }

  getWidth() {
    return this.background.displayWidth;
  }

  getHeight() {
    return this.background.displayHeight;
  }

  setCollide(object, callback) {
    this.objects.forEach((object) => {
      const collide = this.scene.physics.add.overlap(portal, object, () => {
        callback();
        collide.collideCallback = null;
      });
    });
  }
}
