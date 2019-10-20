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

  static getAll(req, res, next) {
    Item.find().sort({
      createdAt: -1
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static filterTag(req, res, next){
    let tags = [req.params.tag]
    console.log('here');
    Item.find({ tags : {$all : tags}})
    .sort({createdAt : -1})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static destroy(req, res, next) {
    let { id } = req.params
    Item.findByIdAndDelete(id)
      .then(data => {
        if (data){
          res.status(200).json(  {
            message : `Success Delete ${data.name}`
        })
      }
      else {
        next({status : 404, message :'Item Not Found'})
      }
    })
      .catch(next)
  }



  static getOne(req, res, next) {
    let { id} = req.params
    Item.findById(id)
      .then(data => {
        if (data){
          res.status(200).json(data)
        }
        else {
          next({status : 404, message :'Item Not Found'})
        }
      }).catch(next)
  }

  static update(req, res, next){
    let {id} = req.params
    const {name, description, featured_image, stock, price, tags} = req.body
    let changes = {name, description, featured_image, stock, price, tags}
    Item.findByIdAndUpdate(  id, changes, { runValidators: true })
    .then( data => {
      if (data){
        res.status(200).json({ 
          message : 'Success Update'
        })
      }
      else {
        next({status : 404, message :'Item Not Found'})
      }
    }).catch(next)
  }

  static setStock(req, res, next){
    let {add, _id} = req.body
    Item.findById(_id)
    .then(data =>{
      let updatedStock = data.stock + add
      if (updatedStock < 0){
        next({
          status : 400,
          message : `Our stock only ${data.stock}`
        })
      }
      else {
        data.stock = updatedStock
        data.save()
        res.status(200).json({
          name : data.name,
          stock : data.stock
        })
      }
    })
    .catch(next)
  }


}

module.exports = ItemController