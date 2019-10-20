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
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
  }
}