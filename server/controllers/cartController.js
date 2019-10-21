ObjectId = require('mongodb').ObjectID;
const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
  static cartList(req,res,next){
    Cart.findOne({user:req.loggedUser._id})
    .populate('cart.product')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static addToCart(req,res,next){
    const {productId,amount} = req.body
    let cart = [{
      product: productId, 
      amount
    }]
    const {_id} = req.loggedUser
    Cart.findOne({user:_id})
      .then(data => {
        if(data){
          res.redirect(`/carts/addItem/?productId=${productId}&amount=${amount}`)
        }
        else{
          return Cart.create({cart, user:_id})
        }
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static addOneItemToCart(req,res,next){
    const {productId,amount} = req.query
    const {_id} = req.loggedUser
    Cart.findOne({user:_id})
      .then(data => {
        for(let i = 0; i < data.cart.length; i++){
          if(data.cart[i].product == productId){
            return res.redirect(`/carts/addAmount/?productId=${productId}&amount=${data.cart[i].amount}`)
          }
        }
        return Cart.updateOne({user:_id},{$push:{cart:{product:productId,amount}}})
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static addAmountToSameItem(req,res,next){
    const {amount, productId} = req.query
    const {_id} = req.loggedUser
    Cart.updateOne(
      {user:_id, "cart.product":productId},
      {$set:{'cart.$.amount':`${Number(amount)+1}`}})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static deleteItemFromCart(req,res,next){
    const {productId} = req.params
    console.log(ObjectId(productId));
    const {_id} = req.loggedUser
    Cart.updateOne({user:_id},{$pull:{cart:{_id:ObjectId(productId)}}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = CartController