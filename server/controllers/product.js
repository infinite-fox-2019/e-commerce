const Product = require('../models/product')

class ProductController {
    static findAll (req, res, next) {
        Product.find().exec()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(next)
    }
    static findOne (req, res, next) {
        const { id } = req.params
        Product.find({ _id: id }).exec()
        .then(product => {
            res.status(200).json(product)
        })
        .catch(next)
    }
    static create (req, res, next) {
        const { name, description, price, stock, file } = req.body
        Product.create({ name, description, stock, price, file })
        .then(product => {
            if (product) {
                res.status(201).json({ response: "Product Created Successfully" })
            } else {
                next({ msg: "Product Not Found" })
            }
        })
    }
    static update (req, res, next) {
        const { id } = req.params
        let obj = {}
        for (let prop in req.body) {
            if (req.body[prop] || Number(req.body[prop]) === req.body[prop] ) {
                obj[prop] = req.body[prop]
            }
        }
        Product.updateOne({ _id: id }, obj).exec()
        .then(_ => {
            res.status(200).json({ response: "Product Updated Successfully" })
        })
        .catch(next)
    }
    static delete (req, res, next) {
        const { id } = req.params
        Product.deleteOne({ _id: id }).exec()
        .then(_ => {
            res.status(200).json({ response: "Product Removed Successfully" })
        })
        .catch(next)
    }
}

module.exports = ProductController