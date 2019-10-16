const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next) {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    User.findOne({
      _id: req.loggedUser.id
    })
    .then(result => {
      if (!result) {
        next({
          statusCode: 401,
          message: 'Unauthorized'
        })
      } else {
        next()
      }
    })
  } catch (error) {
    next({
      statusCode: 401,
      msg: 'Not Logged User'
    })
  }
}

module.exports = {
  authentication
}