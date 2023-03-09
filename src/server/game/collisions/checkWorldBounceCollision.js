const { WORLD_SIZE } = require("../../../shared/config/gameConfig");
const squareCollision = require("./squareCollision");

const worldSize = {
  x: 0,
  y: 0,
  w: WORLD_SIZE.WIDTH,
  h: WORLD_SIZE.HEIGHT,
};

function checkWorldBounceCollision(position) {
  if (squareCollision(worldSize, position.x, position.y)) {
    return false;
  } else {
    return true;
  }
}

module.exports = checkWorldBounceCollision;
