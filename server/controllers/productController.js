const Product = require('../models/product')

class ProductController {

  static productList(req,res,next){
    Product.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static addProduct(req,res,next){
    const {name, qty, price, file} = req.body
    Product.create({name, qty, price, file})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static editProduct(req,res,next){
    const {name, qty, price} = req.body
    const {id} = req.params
    Product.update({_id:id},{name, qty, price})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static editProductQty(req,res,next){
    const {qty} = req.body
    const {id} = req.params
    Product.replaceOne({_id:id},{qty})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static removeProduct(req,res,next){
    const {id} = req.params
    Product.deleteOne({_id:id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = ProductController