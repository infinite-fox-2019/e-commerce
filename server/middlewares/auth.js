let verifyToken = require('../helpers/jwt').verifyToken
let User = require('../models/User')

function authentication(req,res,next){
  try {
    let token = req.headers.token
    let decodedToken = verifyToken(token)
    req.loggedUser = decodedToken
    next()
  } catch (error) {
    next(error)
  }
}

function authorization(req,res,next){
  let {admin} = req.loggedUser
  if (admin){
    next()
  } else {
    let name = 'Authorization failed'
    next({name})
  }  
}

module.exports = {authentication,authorization}