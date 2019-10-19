const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')

authentication = (req, res, next) => {
  if(!req.headers.access_token) {
    throw {status: 401, msg: ['You have to login first!']}
  } else {
    const { username } = decodeToken(req.headers.access_token)
    User.findOne({ username })
    .then(user => {
      if(!user) {
        throw {status: 401, msg: ['You have to login first!']}
      } else {
        req.loggedUser = user
        next()
      }
    })
    .catch(next)
  }
}

adminAuthorization = (req, res, next) => {
  try {
    if(req.loggedUser.role !== 'admin') {
      throw {statue: 401, msg: ['You are not authorized to access this page']}
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authentication,
  adminAuthorization
}