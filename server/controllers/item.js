const Item = require('../models/item')

class ItemController {
  static create(req, res, next) {
    let { name, featured_image, description, stock, price, tags } = req.body
    Item.create({
      name,
      featured_image,
      description,
      stock,
      price,
      tags
    }).then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }

  static getItems(req, res, next) {
    Item.find().sort({
      createdAt: -1
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    let { id } = req.params
    Item.findByIdAndDelete(id)
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }



  static getOne(req, res, next) {
    let {
      id
    } = req.params
    Item.findById(id)
      .then(data => {
        res.status(200).json({
          data
        })
      }).catch(next)
  }


}

module.exports = ItemController