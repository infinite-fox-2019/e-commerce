const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User
      .create({
        name,
        email,
        password
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({email})
      .then(user => {
        if(user && comparePassword(password, user.password)) {
          const payloads = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
          const token = generateToken(payloads)
          res.status(200).json({token})
        }
      })
  }
}

module.exports = UserController