const Product = require('../models/product')

class ProductController {
    static getall(req,res,next){
        Product.find()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
    static create(req, res, next){
        const {name, desc, price, stock} = req.body
        let image = req.file.cloudStoragePublicUrl
        
        Product.create({name, desc, price, stock, image})
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }
    static delete(req, res, next){
        const {id} = req.params
        Product.deleteOne({_id:id})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
    static update(req, res, next){
        const {id} = req.params
        const {name, desc, price, stock} = req.body
        Product.update({_id:id}, {
            name,
            desc,
            price,
            stock
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = ProductController