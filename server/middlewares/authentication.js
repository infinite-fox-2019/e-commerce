'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authentication: function (req, res, next) {
    const authorization = req.headers.token
    if (!authorization) return next({ status: 401, message: 'Token is required' })
    const auth = authorization.replace('Bearer', '')
    try {
      const decoded = verifyToken(auth)
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
