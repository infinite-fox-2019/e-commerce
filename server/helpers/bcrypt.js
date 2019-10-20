const bcrypt = require('bcrypt')

function generateHash(password){
  const salt = bcrypt.genSaltSync(5)
  return bcrypt.hashSync(password,salt)
}

function decodeHash(password, hash){
  return bcrypt.compareSync(password,hash)
}

module.exports = {
  generateHash,decodeHash
}