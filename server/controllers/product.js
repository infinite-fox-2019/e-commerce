const Product = require('../models/Product')

module.exports = {
  find: (req, res, next) => {
    Product.find()
    .then(products => {
      res.status(200).json(products)
    })
    .catch(next)
  },
  add: (req, res, next) => {
    const { name, description, price, stock, series, image } = req.body

    Product.create({ name, description, price, stock, series, image })
    .then(product => {
      res.status(201).json(product)
    })
    .catch(next)
  },
  update: (req, res, next) => {
    const { name, description, price, stock, series, image } = req.body

    Product.findByIdAndUpdate(req.params.id, {
      name, description, price, stock, series, image
    }, {useFindAndModify: false, omitUndefined: true, runValidators: true})
    .then(product => {
      res.status(200).json(product)
    })
    .catch(next)
  },
  delete: (req, res, next) => {
    console.log(req.params)
    Product.findByIdAndDelete(req.params.id)
    .then(product => {
      res.status(200).json(product)
    })
    .catch(next)
  }
}