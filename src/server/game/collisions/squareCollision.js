const { PLAYER_SIZE } = require("../../../shared/config/gameConfig");

function squareCollision(object, x, y) {
  return (
    x + PLAYER_SIZE.WIDTH >= object.x &&
    y + PLAYER_SIZE.HEIGHT >= object.y &&
    x <= object.x + object.w &&
    y <= object.y + object.h
  );
}

module.exports = squareCollision;
