const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')
const Cart = require('../models/Cart')

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
},

cartAuthorization = (req, res, next) => {
  Cart.findById(req.params.id)
  .then(cart => {
    try {
      if(!cart) {
        throw {status: 404, msg: ['Data not found']}
      } else {
        if(String(cart.customer) !== String(req.loggedUser._id)) {
          throw {status: 401, msg: ['You are not authorized to access this data']}
        } else {
          next()
        }
      }
    } catch (err) {
      next(err)
    }
  })
}

module.exports = {
  authentication,
  adminAuthorization,
  cartAuthorization
}
