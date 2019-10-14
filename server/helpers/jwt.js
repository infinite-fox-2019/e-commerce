const jwt = require('jsonwebtoken')

function generateToken(payload){
  //payload adalah object
  return jwt.sign(payload, process.env.JWTSECRET)
}

function decodeToken(token){
  return jwt.verify(token,process.env.JWTSECRET)
}

module.exports = {generateToken,decodeToken}