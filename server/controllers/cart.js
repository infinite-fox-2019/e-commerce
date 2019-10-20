const Cart = require('../models/Cart')

module.exports = {
  find: (req, res, next) => {
    Cart.find({ customer: req.loggedUser._id })
    .populate('product')
    .then(carts => {
      res.status(200).json(carts)
    })
    .catch(next)
  },
  add: (req, res, next) => {
    const { customer, product, qty } = req.body 
    Cart.create({ customer, product, qty })
    .then(cart => {
      res.status(201).json(cart)
    })
    .catch(next)
  },
  delete: (req, res, next) => {
    Cart.findByIdAndDelete(req.params.id)
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(next)
  }
}