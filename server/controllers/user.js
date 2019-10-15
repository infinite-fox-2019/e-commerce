const User = require('../models/User')
const {generateToken} = require('../helpers/jwt')

module.exports = {
  register: (req, res, next) => {
    const {username, email, password, admin_password} = req.body
    User.create({username, email, password, admin_password})
    .then(created => {
      const {_id, username, email, password} = created
      let jsonSend = {
        id: _id,
        username,
        email,
        hashed_password: password
      }
      let access_token = generateToken(jsonSend)
      jsonSend.access_token = access_token
      console.log(jsonSend)
      res.status(201).json(jsonSend)
    })
    .catch(next)
  }
}