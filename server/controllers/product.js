'use strict'

const { Product } = require('../models')
const { deleteFile } = require('../middlewares/image')

class ProductController {
  static create (req, res, next) {
    const newProduct = {
      name: req.body.name,
      price: +req.body.price,
      quantity: +req.body.quantity,
      description: req.body.description || 'No description'
    }
    console.log(req.file)
    if (req.file) {
      newProduct.imageName = req.file.cloudStorageObject
      newProduct.imageUrl = req.file.url
    }
    Product.create(newProduct)
      .then((product) => {
        console.log('New product successfully created')
        res.status(201).json(product)
      }).catch(next)
  }

  static findAll (req, res, next) {
    console.log('Successfully read all products')
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findOne (req, res, next) {
    const id = req.params.id
    Product.findById(id)
      .exec()
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static edit (req, res, next) {
    const productId = req.params.id
    const input = req.body
    const update = {}
    for (const keys in input) {
      update[keys] = req.body[keys]
    }
    if (req.file) {
      update.imageName = req.file.cloudStorageObject
      update.imageUrl = req.file.url
    }
    Product.findByIdAndUpdate(productId,
      { $set: update }
      // ,{ new: true }
    )
      .then((previousUpdatedProduct) => {
        deleteFile(previousUpdatedProduct.imageUrl)
        res.status(200).json({ message: 'Product successfully updated', previousUpdatedProduct })
      })
      .catch(next)
  }

  static remove (req, res, next) {
    const productId = req.params.id
    Product.findByIdAndDelete(productId)
      .then(deletedProduct => {
        deleteFile(deletedProduct.imageUrl)
        res.status(200).json({ message: 'Product successfully deleted', deletedProduct })
      })
      .catch(next)
  }
}

module.exports = ProductController
