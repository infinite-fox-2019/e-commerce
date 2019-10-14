const Product = require('../models/Product')

class ProductController {
    static create(req,res,next) {
        const {name,desc,price,stock} = req.body
        Product.create({name,desc,price,stock})
        .then(product=>{
            res.status(201).json(product)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        const {id} = req.params
        Product.deleteOne({_id:id})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = ProductController