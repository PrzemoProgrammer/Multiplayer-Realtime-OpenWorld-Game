const { generateToken, verifyToken } = require("./token/jwt");

class AccountManager {
  constructor(database) {
    this.database = database;
  }

  handleLogin = async (req, res) => {
    try {
      const loginData = req.body;
      const accountId = loginData.username + loginData.password;

      const playerData = await this.database.downloadPlayer({ accountId });

      if (!playerData || typeof playerData !== "object") {
        return res.json(false);
      }

      const payload = playerData.nick;

      const token = generateToken(payload);

      res.json(token);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  handleRegister = async (req, res) => {
    try {
      const data = req.body;
      const accountId = data.login + data.password;

      const existingAccount = await this.database.findPlayer({ accountId });
      if (existingAccount) {
        return res.json({ login: false });
      }

      const existingNick = await this.database.findPlayer({ nick: data.nick });
      if (existingNick) {
        return res.json({ nick: false });
      }

      const playerData = {
        accountId,
        nick: data.nick,
        skin: data.skin,
      };

      await this.database.addPlayer(playerData);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  verifyToken(token) {
    return verifyToken(token);
  }
}

module.exports = AccountManager;
