const User = require('../models/User')
const generateHash = require('../helpers/bcrypt').generateHash
const reverseHash = require('../helpers/bcrypt').compareHash
const getToken = require('../helpers/jwt').generateToken


class UserController {
  static async findAll(req,res,next){
    try {
      const user = await User.find()
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async add(req,res,next){
    try {
      let {username,email,password} = req.body
        const findUser = await User.findOne({email})
        if (findUser){
          let name = 'Email already in use'
          next({name})
        } else {
          if(password.length > 1){
            let hashPassword = generateHash(password)
            const user = await User.create({username,email,password : hashPassword})
            let payload = {
              email:user.email,id:user._id
            }
            let token = getToken(payload)
            res.status(200).json({token})
          } else {
            let name = 'Password cannot empty'
            next({name})
          }
        }
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let updatedField = req.body
      let arr = ['username','email','password']
      let {_id} = req.params
      let obj = {}
      for (let key in updatedField){
        arr.forEach((element)=>{
          if (key === element){
            obj[key] = updatedField[key] 
          }
        })
      }
      const updated = await User.updateOne({_id},{$set:obj})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async login(req,res,next){
    try {
      let {email,password} = req.body
      const user = await User.findOne({email})
      if(user){
        if(reverseHash(password,user.password)){
          let payload = {
            email,id:user._id
          }
          let token=getToken(payload)
          res.status(200).json({token})
        }else{
          let name = 'Email/Password wrong'
          next({name})
        }
      }else {
        let name = 'Email/Password wrong'
        next({name})
      }
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let {_id} = req.params
      const deleted = await User.deleteOne({_id})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }


}


module.exports = UserController