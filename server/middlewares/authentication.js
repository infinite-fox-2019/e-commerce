'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authentication: function (req, res, next) {
    try {
      const decoded = verifyToken(req.headers.token)
      User.find({ email: decoded.email })
        .then((user) => {
          if (user.length > 0) {
            req.decoded = decoded
            console.log(req.decoded)
            next()
          } else {
            next({ status: 403, message: 'Unauthorized!' })
          }
        }).catch(next)
    } catch (err) {
      next({ status: 401, message: 'Authentication failed. Please sign in first!' })
    }
  }
}
