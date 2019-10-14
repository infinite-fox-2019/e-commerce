const User = require('../models/User')

module.exports = {
  register: (req, res, next) => {
    const {username, email, password, admin_password} = req.body
    User.create({username, email, password, admin_password})
    .then(created => {
      res.status(200).json(created)
    })
    .catch(next)
  }
}