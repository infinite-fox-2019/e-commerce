const User = require('../models/User')
const Product = require('../models/Products')
const Transaction = require('../models/Transactions')
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

  static async findOne(req,res,next){
    try {
      let _id = req.params._id
      const user = await User.findById({_id}).populate('cart.productId')
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
              email:user.email,id:user._id,admin:false
            }
            let admin = user.admin
            let id = user._id
            let token = getToken(payload)
            
            res.status(200).json({token,admin,id})
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
            email,id:user._id,admin:user.admin // perlu masukin admin ?
          }
          let token=getToken(payload)
          let admin = user.admin
          let id = user._id
          res.status(200).json({token,admin,id})
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

  static async addToCart(req,res,next){
    try {
      let {productId,qty} = req.body
      let thisCart = {productId,qty}
      let {_id} = req.params
      const updated = await User.updateOne({_id},{$push:{cart:thisCart}})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async updCart(req,res,next){
    try {
      let {productId} = req.body
      let {_id} = req.params
      const updated = await User.updateOne({_id},{$pull:{cart:{productId}}})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async checkout(req,res,next){
    try {
      let {_id} = req.params
      const user = await User.findOne({_id}).populate('cart.productId')
      for (let productCart of user.cart){
        const product = await Product.findOne({_id:productCart.productId._id})
        const updated = await Product.updateOne({_id : productCart.productId._id},{$set:{quantity : (product.quantity-productCart.qty)}})
      }
      let cartArr = []
      for (let i = 0; i < user.cart.length; i++){
        let obj = {}
        obj.product = user.cart[i].productId._id
        obj.qty = user.cart[i].qty
        cartArr.push(obj)
      }
      const transaction = await Transaction.create({userId:_id,cart:cartArr})
      await User.findOneAndUpdate({_id},{cart:[]})
      let msg = "Checkout berhasil"
      res.status(200).json(msg)
    } catch (error) {
      next(error)
    }

  }

  static async transaction(req,res,next){
    try {
      const transactions = await Transaction.find().populate(['userId','cart.product']).sort({createdAt : 'desc'})
      res.status(200).json(transactions)
    } catch (error) {
      next(error)      
    }
  }


}


module.exports = UserController