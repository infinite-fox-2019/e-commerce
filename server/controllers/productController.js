const Product = require('../models/Product')

class ProductController{
  static getAll(req, res, next){
    Product.find()
      .then(product=>{
        res.status(200).json(product)
      })
      .catch(next)
  }

  static getOne(req, res, next){
    const _id = req.params.id
    Product.findOne({_id})
      .then(product=>{
        res.status(200).json(product)
      })
      .catch(next)
  }

  static createOne(req, res, next){
    const featured_image = req.file.cloudStoragePublicUrl
    const {title, price, description, stock} = req.body

    console.log(featured_image);
    
    Product.create({
      title, price, description, stock, picture: featured_image
    })
      .then(product=>{
        console.log(123);
        
        res.status(201).json(product)
      })
      .catch(err=>{
        console.log(err);
        
      })
  }

  static deleteOne(req, res, next){
    const _id = req.params.id
    Product.deleteOne({_id})
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static editOne(req, res, next){
    const {title, price, description, stock} = req.body
    const _id = req.params.id
    Product.updateOne({_id}, {
      title,
      price,
      description,
      stock
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static buyProduct(req, res, next){
    const _id = req.params.id
    Product.findOne({_id})
      .then(product=>{
        const sisa = product.stock - 1
        if(sisa < 0){
          throw {
            msg: 'Stock is not enough'
          }
        }
        else{
          return Product.updateOne({_id},
            {
              stock: sisa
            })
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static searchItem(req, res, next){
    const search = req.body.search
    console.log(search, '=========');
    console.log(req.body);
    
    
    Product.find({title: {$regex: search}})
      .then(products=>{
        res.status(200).json(products)
      })
      .catch(next)
  }
}

module.exports = ProductController