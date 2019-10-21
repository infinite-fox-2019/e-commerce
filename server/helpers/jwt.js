const jwt = require('jsonwebtoken')

function sign(obj){
  return jwt.sign(obj, 'secret')
}

function verify(token){
  return jwt.verify(token, 'secret')
}

module.exports = {sign, verify}