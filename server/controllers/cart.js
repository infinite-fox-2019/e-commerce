const Cart = require('../models/cart')

class CartController {
  static add(req, res, next) {
    const {UserId, ProductId} = req.body
    Cart
      .create({
        UserId,
        ProductId
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = CartController