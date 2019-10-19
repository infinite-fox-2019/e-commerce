const User = require('../models/User')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const {username, email, password, admin_password} = req.body
    let role
    if(admin_password) {
      if(admin_password !== process.env.ADMIN_PASSWORD) {
        throw {status: 400, msg: ['Wrong admin password']}
      } else {
        role = 'admin'
      }
    }
    User.create({username, email, password, admin_password, role})
    .then(created => {
      const {_id, username, role} = created
      let jsonSend = {
        id: _id,
        username,
        role
      }
      let access_token = generateToken(jsonSend)
      jsonSend.access_token = access_token
      res.status(201).json(jsonSend)
    })
    .catch(next)
  },
  login: (req, res, next) => {
    const {username, password, role} = req.body
    let objFind = {username}
    if(username.includes('@')) {
      objFind = {email: username}
    }
    User.findOne(objFind)
    .then(user => {
      if(!user || !comparePassword(password, user.password)){
        throw {status: 400, msg: ['Wrong username/password']}
      }
      const {_id, username, role} = user
      let jsonSend = {
        id: _id,
        username,
        role
      }
      jsonSend.access_token = generateToken(jsonSend)
      res.status(200).json(jsonSend)
    })
    .catch(next)
  }
}