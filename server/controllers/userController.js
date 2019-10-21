const User = require('../models/User')
const {sign, verify} = require('../helpers/jwt')
const {hash, compare} = require('../helpers/bcrypt')

class UserController {
  static findOne(req, res, next){
    const _id = req.params.id
    console.log(1234);

    User.findOne({_id})
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(next)
  }

  static login(req, res, next){
    const {email, password} = req.body

    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const token = sign({id: user._id, email, name: `${user.first_name} ${user.last_name}`, status: user.status})
          res.status(200).json(token)
        }
        else{
          throw {msg: 'email/password wrong'}
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    const {first_name, last_name, email, password, status} = req.body
    const hassedPassword = hash(password)

    User.create({
      first_name, 
      last_name, 
      email, 
      password: hassedPassword, 
      status})
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
      
  }

  static addToCart(req, res, next){
    console.log(123);
    
    const token = req.headers.access_token
    const productId = req.body.productId
    console.log(productId);
    
    let id = ''
    try{
      const user = verify(token)
      id = user.id
    }
    catch{
      throw {
        msg: 'token error'
      }
    }
    User.updateOne({_id: id}, { $push: { cart: productId } })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static deleteCart(req, res, next){
    const _id = req.params.id
    const cart = req.body.cart
    User.updateOne({_id}, {
      cart
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = UserController