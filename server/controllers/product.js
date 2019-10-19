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
      let sendJson = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        series: product.series,
        image: product.image
      }
      res.status(201).json(sendJson)
    })
    .catch(next)
  }
}