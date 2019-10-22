const Product = require('../models/product')

class Controller {
    static create(req, res, next) {
        Product.create({
            AdminId: req.loggedUser._id,
            name: req.body.name,
            qty: req.body.qty || 1,
            description: req.body.description,
            price: req.body.price,
            category: req.body.categories.split(','),
            image: req.file.cloudStoragePublicUrl || 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
        })
            .then(createdProduct => {
                console.log(createdProduct)
                res.status(201).json(createdProduct)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Product.deleteOne({
            _id: req.params.id,
            AdminId: req.loggedUser._id
        })
            .then(deletedData => {
                if (deletedData.deletedCount) {
                    res.status(200).json({ message: 'successfully deleted product' })
                } else {
                    next({ name: 'CastError' })
                }
            })
            .catch(next)
    }

    static patch(req, res, next) {
        console.log('masuuk')
        let updated = {}
        if (!req.file) {
            updated = {
                name: req.body.name,
                qty: req.body.qty || 1,
                description: req.body.description,
                price: req.body.price,
                category: req.body.categories.split(',')
            }
        } else {
            updated = {
                name: req.body.name,
                qty: req.body.qty || 1,
                description: req.body.description,
                price: req.body.price,
                category: req.body.categories.split(','),
                image: req.file.cloudStoragePublicUrl || 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
            }
        }
        Product.updateOne({
            _id: req.params.id,
            AdminId: req.loggedUser._id
        }, updated)
            .then(updatedData => {
                res.status(200).json({ message: 'successfully updated product' })
            })
            .catch(next)
    }
}

module.exports = Controller