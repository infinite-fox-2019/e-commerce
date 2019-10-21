const Product = require('../models/Product')

class ProductController {

    static create(req, res, next) {
        const { name, description, image, price, stock } = req.body
        const sellerId = req.decode.id
        Product.create({ name, description, image, price, stock, sellerId })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static find(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        const id = req.params.id
        Product.findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        // BELUM DELETE GAMBAR YANG DI GOOGLE CLOUD
        const { name, description, image, price, stock } = req.body
        let id = req.params.id
        Product.findByIdAndUpdate(
            id,
            { name, description, image, price, stock },
            { omitUndefined: true })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        // BELUM DELETE GAMBAR YANG DI GOOGLE CLOUD
        let id = req.params.id
        Product.findByIdAndDelete(id)
            .then(() => {
                res.status(200).json({
                    message: 'Product deleted'
                })
            })
            .catch(next)
    }

}

module.exports = ProductController