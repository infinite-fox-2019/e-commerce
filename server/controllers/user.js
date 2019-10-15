const User = require('../models/User')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const {username, email, password, admin_password} = req.body
    User.create({username, email, password, admin_password})
    .then(created => {
      const {_id, username, email, password} = created
      let jsonSend = {
        id: _id,
        username
      }
      let access_token = generateToken(jsonSend)
      jsonSend.access_token = access_token
      res.status(201).json(jsonSend)
    })
    .catch(next)
  },
  login: (req, res, next) => {
    const {username, password} = req.body
    console.log(username, password)
    User.findOne({username})
    .then(user => {
      if(!user || !comparePassword(password, user.password)){
        throw {status: 400, msg: ['Wrong username/password']}
      }
      let jsonSend = {
        id: user._id,
        username: user.username
      }
      jsonSend.access_token = generateToken(jsonSend)
      res.status(200).json(jsonSend)
    })
    .catch(next)
  }
}