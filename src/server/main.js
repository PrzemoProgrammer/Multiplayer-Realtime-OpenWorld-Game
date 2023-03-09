const DatabaseManager = require("./db/databaseManager");
const AccountManager = require("./db/account/AccountManager");
const { app, server, port, io } = require(".");
const World = require("./game/World");

const databaseManager = new DatabaseManager();
const accountManager = new AccountManager(databaseManager);
const world = new World(databaseManager);

server.listen(port, async () => {
  await databaseManager.connectDatabase();

  app.post("/login", (req, res) => {
    accountManager.handleLogin(req, res);
  });

  app.post("/register", (req, res) => {
    accountManager.handleRegister(req, res);
  });

  io.on("connection", (socket) => {
    console.log("new user");

    socket.once("getGameState", (token) => {
      world.getGameState({ socket, accountManager, token });
    });

    socket.on("sendPlayerDirection", (direction) => {
      world.sendPlayerDirection(socket, direction);
    });

    socket.on("newChatMessage", (message) => {
      world.newChatMessage(socket, message);
    });

    socket.on("disconnect", () => {
      world.disconnect(socket);
    });
  });

  setInterval(function () {
    world.updatePlayersPosition();
  }, 1000 / 15);

  // dead reckoning
  console.log("server is ready on port " + port);
});
