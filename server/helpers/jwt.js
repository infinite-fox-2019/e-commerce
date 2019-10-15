const jwt = require("jsonwebtoken");
const secret = 'HACKTIV8';

function generateToken(payload) {
  return jwt.sign(payload, secret);
}

function decodeToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  generateToken,
  decodeToken
};