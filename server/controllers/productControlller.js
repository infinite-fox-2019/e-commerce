const Product = require('../models/product');

class ProductController {

    static find(req, res, next) {

        Product.find()

        .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        const { id } = req.params

        Product.findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { name, description, image, price, stock } = req.body;

        Product.create({ name, description, image, price, stock })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { name, description, image, price, stock } = req.body
        const { id } = req.params

        let updateObj = {}
        if (name) updateObj.name = name
        if (description) updateObj.description = description
        if (image) this.updateObj.image = image
        if (price) this.updateObj.price = price
        if (stock) this.updateObj.stock = stock
        Product.findByIdAndUpdate({ id }, updateObj)
            .then(product => {
                // if(image) delete the image on the cloud based on product.image

                res.status(200).json({
                    message: `Product ${product.name} updated successfully`
                })
            })
            .catch(next)
    }


    static delete(req, res, next) {
        const { id } = req.params

        Product.findOneAndRemove({ _id: id })
            .then(product => {
                // if(image) delete the image on the cloud based on product.image
                res.status(200).json({ message: `Product ${product.name} deleted successfully` })
            })
            .catch(next)
    }
}

module.exports = ProductController