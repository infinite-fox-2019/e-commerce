const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload,"secret123secret")
}

function verifyToken(token){
  return jwt.verify(token,"secret123secret")
}

module.exports = {generateToken,verifyToken}