const {decodeToken} = require('../helpers/jwt')

function authentication(req,res,next){
  if(req.headers.authorization){
    let dataLoginUser = decodeToken(req.headers.authorization)
    req.loggedUser = dataLoginUser
    next()
  }
  else{
    res.status(400).json({msg:"You must login first to continue"})
  }
}

function authorization(req,res,next){
  console.log(req.loggedUser.role)
  if(req.loggedUser.role === "admin" || req.loggedUser.role === "superadmin"){
    next()
  }
  else{
    res.status(400).json({msg:"You don't have access to see this page"})
  }
}

module.exports = {authorization,authentication}