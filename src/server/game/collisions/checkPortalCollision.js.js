const mapsConfig = require("../../../shared/config/maps/index");
const squareCollision = require("./squareCollision");

function checkPortalCollision(room, position) {
  for (let _portal in mapsConfig[room].portals) {
    const portal = mapsConfig[room].portals[_portal];

    if (squareCollision(portal, position.x, position.y)) return portal.name;
  }
}

module.exports = checkPortalCollision;
