const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  ID: String,
  accountId: String,
  nick: String,
  stats: {
    lvl: Number,
    skin: String,
    moveSpeed: Number,
    attack: {
      speed: Number,
      dmg: Number,
    },
  },
  position: {
    x: Number,
    y: Number,
  },
  map: String,
});

module.exports = mongoose.model("Players", PlayerSchema);
