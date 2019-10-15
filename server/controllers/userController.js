const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {decodeHash, generateHash} = require('../helpers/bcrypt')

class UserController {

  static login(req,res,next){
    const {email,password} = req.body
    User.findOne({email})
      .then(data => {
        console.log(decodeHash(password, data.password))
        if(data && decodeHash(password, data.password)){
          console.log(data)
          let token = generateToken({name:data.name, email:data.email, _id:data._id, role:data.role})
          res.status(200).json({token})
        }
        else{
          throw {msg : "Wrong password or email", status : 400}
        }
      })
      .catch(next)
  }

  static register(req,res,next){
      const {name, email, password} = req.body
      let roleStatus;
      if(req.loggedUser && req.loggedUser.role === "superadmin"){
        roleStatus = 'admin'
      }
      User.create({name, email, password, role: roleStatus})
        .then(data => {
          res.status(201).json(data)
        })
        .catch(next)
    }

}

module.exports = UserController