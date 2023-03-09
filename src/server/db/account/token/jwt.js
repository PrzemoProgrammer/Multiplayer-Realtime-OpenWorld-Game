const jwt = require("jsonwebtoken");
const { secret } = require("./config/credentials");

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secret);
  },
  verifyToken: (token) => {
    return jwt.verify(token, secret);
  },
};
