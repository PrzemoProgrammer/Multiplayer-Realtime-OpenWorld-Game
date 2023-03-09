const mongoose = require("mongoose");
const { DB_URL } = require("./config/credentials");
mongoose.set("strictQuery", true);
const Player = require("./models/Player");

class DatabaseManager {
  constructor() {}

  async connectDatabase() {
    await mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log("DB init");
      });
  }

  addPlayer(data) {
    const player = new Player({
      ID: "null",
      accountId: data.accountId,
      nick: data.nick,
      stats: {
        lvl: 1,
        skin: data.skin,
        moveSpeed: 3,
        attack: {
          speed: 1,
          dmg: 10,
        },
      },
      position: {
        x: 100,
        y: 450,
      },
      map: "city-map",
    });

    player.save(function (error) {
      if (error) {
        console.log(error + " Player NOT saved in database");
      } else {
        console.log("Player saved in database");
      }
    });
  }

  updatePlayer(data) {
    Player.updateOne(
      { nick: data.nick },
      {
        $set: {
          accountId: data.accountId,
          nick: data.nick,
          stats: {
            lvl: data.stats.lvl,
            skin: data.stats.skin,
            moveSpeed: data.stats.moveSpeed,
            attack: {
              speed: data.stats.attack.speed,
              dmg: data.stats.attack.dmg,
            },
          },
          position: {
            x: data.position.x,
            y: data.position.y,
          },
          map: data.map,
        },
      },

      function (error) {
        if (error) {
          console.log(error) + " ERROR update player";
        } else {
          console.log("Update successful!");
        }
      }
    );
  }

  findPlayer(data) {
    return Player.findOne(data);
  }

  downloadPlayer(data) {
    return this.findPlayer(data).then((player) => {
      if (!player) {
        return "Player does not exist";
      }
      return player;
    });
  }
}

mongoose.connection.on("connected", function () {
  console.log("Connected to mongo");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection ERROR", error);
  // process.exit(1);
});

module.exports = DatabaseManager;
