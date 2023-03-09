import Player from "./player/Player";

export default class Players {
  constructor(scene, playersData) {
    this.scene = scene;
    this.playersData = playersData;

    this.players = {};

    this.addPlayers();
  }

  addPlayers() {
    for (let _player in this.playersData) {
      if (this.scene.server.isMyId(_player)) continue;
      // console.log("pomija ciebie");
      console.log("nowy gracz");
      this.addPlayer(this.playersData[_player]);
    }
  }

  addPlayer(data) {
    this.players[data.ID] = new Player(this.scene, data);
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(id) {
    return this.players[id];
  }

  removePlayer(id) {
    this.destroy(id);
    delete this.players[id];
  }

  removeAllPlayers() {
    for (let _player in players) {
      this.removePlayer(_player.ID);
    }
  }

  destroy(id) {
    const player = this.getPlayer(id);
    if (player) player.destroy();
  }

  playMoveAnim(player, currPosition) {
    const playerPosition = player.getPosition();

    if (
      currPosition.x + 0.8 > playerPosition.x &&
      currPosition.x - 0.8 < playerPosition.x &&
      currPosition.y + 0.8 > playerPosition.y &&
      currPosition.y - 0.8 < playerPosition.y
    ) {
      player.idle();
      return;
    }

    if (currPosition.x > playerPosition.x) {
      player.playerFlipX = true;
      player.playAnim("-right");
    } else if (currPosition.x < playerPosition.x) {
      player.playerFlipX = false;
      player.playAnim("-left");
    } else if (currPosition.y > playerPosition.y) {
      if (player.isPlayerFlipped()) {
        player.playAnim("-right");
      } else {
        player.playAnim("-left");
      }
    } else if (currPosition.y < playerPosition.y) {
      if (player.isPlayerFlipped()) {
        player.playAnim("-right");
      } else {
        player.playAnim("-left");
      }
    }
  }

  interpolate(start, end, t) {
    return start * (1 - t) + end * t;
  }

  setPosition(id, currPosition) {
    const player = this.getPlayer(id);
    const start = player.getPosition();
    const end = currPosition;
    const time = 0.2; // The duration of the interpolation animation in seconds
    let elapsed = 0;

    const update = () => {
      elapsed += 0.05; // The time elapsed since the last frame in seconds
      const t = elapsed / time;
      const position = {
        x: this.interpolate(start.x, end.x, t),
        y: this.interpolate(start.y, end.y, t),
      };
      this.playMoveAnim(player, end);
      player.setPosition(position.x, position.y);

      if (t < 1) {
        requestAnimationFrame(update);
      }
    };

    update();
  }

  updatePlayersPosition(localPlayerID, playersData) {
    for (let _player in playersData) {
      const id = _player;

      if (localPlayerID === id) continue;
      if (!this.getPlayer(id)) continue;

      const server = playersData[id];

      let currPosition = {
        x: server.x,
        y: server.y,
      };

      this.setPosition(id, currPosition);
    }
  }

  updateDepth() {
    for (let player in this.players) {
      this.players[player].updateDepth();
    }
  }
}
