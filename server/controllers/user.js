const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { getToken } = require('../helpers/jwt')

class UserController {
  static create(req, res, next) {
    const { name, email, address, password } = req.body
    User.create({
      name,
      email,
      address,
      password
    })
      .then(data => {
        const { name, email, address, password , role, cart, history} = data
        res.status(201).json({
          name, email, address, password,role,cart,history,
          token: getToken({ _id: data._id, email: data.email })
        })
      })
      .catch(next)
  }
  static login(req, res, next) {
    let { email, password } = req.body;
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email/Password is required'
      })
    }
    else {
      User.findOne({ email })
        .then(result => {
          if (result && comparePassword(password, result.password)) {
            let { _id, email } = result
            res.status(200).json({
              token: getToken({ _id, email }),
              name: result.name,
              address: result.address,
              email: result.email,
              role: result.role,
              cart: result.cart,
              history: result.history
            })
          }
          else {
            next({
              status: 400,
              message: 'Wrong email/password'
            })
          }
        })
        .catch(next)
    }
  }

  static addCart(req, res, next) {
    let { idItem } = req.params
    User.updateOne({ _id: req.decoded._id }, {
      $push: { cart: idItem }
    })
      .then(() => {
        return User.findById(req.decoded._id)
        .populate({path : 'cart', select: '_id name price featured_image'})
          .then(data => {
            res.status(200).json({ cart: data.cart })
          })
      })
      .catch(next)
  }
  static removeCart(req, res, next) {
    let { idItem } = req.params
    User.findById(req.decoded._id)
    .populate({path : 'cart', select: '_id name price featured_image'})
      .then(data => {
        for (let i=0; i<data.cart.length; i++){
          if (data.cart[i]._id == idItem){
             data.cart.splice(i, 1)
             break
          }
        }
        let newCart = data.cart
        return User.updateOne({_id :req.decoded._id}, {cart : newCart})
        .then(data =>{
          res.status(200).json({cart : newCart})
        })
      })
      .catch(next)
  }

  static getDetail(req, res, next){
    User.findById(req.decoded._id, '-password -createdAt -updatedAt')
    .populate({path : 'cart', select: 'name price featured_image'})
    .populate({path : 'history'})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = UserController