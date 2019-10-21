const Product = require('../models/Product')

class ProductController {
    static read(req,res,next){
        Product.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
    static create(req,res,next) {
        let {name,desc,price,stock} = req.body
        let image = req.file
        
        Product.create({name,desc,price,stock,image:image.cloudStoragePublicUrl})
        .then(product=>{
            res.status(201).json(product)
        })
        .catch(next)
    }
    static update(req,res,next) {
        let {name,desc,price,stock} = req.body
        let image = req.file
        let {id} = req.params
        Product.updateOne({_id:id},{
            name,desc,price,stock,image:image.cloudStoragePublicUrl
        })
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Product.deleteOne({_id:id})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = ProductController