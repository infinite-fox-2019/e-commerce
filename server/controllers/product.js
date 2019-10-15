const Product = require('../models/product')

class ProductController {
    static find(req, res, next) {
        Product.find().sort({ updatedAt: -1 })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)

    }

    static create(req, res, next) {
        const { name, image, price, stock, brand } = req.body
        Product.create({ name, image, price, stock, brand })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static search(req, res, next) {

    }

    static update(req, res, next) {
        const { name, price } = req.body
        Product.findByIdAndUpdate(req.params.id, { name, price })
            .then(product => {
                return Product.findById(req.params.id)
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static updateStock(req, res, next) {
        const { stock } = req.body
        Product.findByIdAndUpdate(req.params.id, { stock })
            .then(product => {
                return Product.findById(req.params.id)
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)

    }

    static updateImage(req, res, next) {
        const { image } = req.body
        Product.findByIdAndUpdate(req.params.id, { image })
            .then(product => {
                return Product.findById(req.params.id)
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
}

module.exports = ProductController