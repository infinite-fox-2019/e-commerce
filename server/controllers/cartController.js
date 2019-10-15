const Cart = require('../models/cart')

class CartController {
  static cartList(req,res,next){
    Cart.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static addToCart(req,res,next){
    const {cart} = req.body
    const {_id} = req.loggedUser
    Cart.create({cart, user:_id})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static addOneItemToCart(req,res,next){
    const productId = req.body._id //Id prodcut
    const {_id} = req.loggedUser
    Cart.update({_id:id},{$push:{cart:{product:productId}}})
  }

  static deleteItemFromCart(req,res,next){
    const {_id,productId} = req.params
    Cart.update({_id}, {$pull:{cart:{product:productId}}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = CartController