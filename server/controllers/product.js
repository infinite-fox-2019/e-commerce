const Product = require('../models/product')

class ProductController {
  static add(req, res, next) {
    const { name, price } = req.body
    Product
      .create({
        name,
        price
      })
      .then(newProduct => {
        res.status(201).json(newProduct)
      })
      .catch(next)
  }
  static find(req, res, next) {
    Product
      .find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  static remove(req, res, next) {
    Product
      .deleteOne({_id: req.params.id})
      .then(deleteCount => {
        res.status(200).json(deleteCount)
      })
      .catch(next)
  }
}

module.exports = ProductController