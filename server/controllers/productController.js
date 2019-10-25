const Product = require('../models/product')

class ProductController {
    static displayAll(req, res, next) {
        Product.find()
            .then(products_data => {
                res.status(200).json(products_data)
            })
            .catch(next)
    }

    static displayForCategory(req, res, next) {
        const id = {
            category: req.params.id
        }

        Product.find(id)
            .then(products_data => {
                res.status(200).json(products_data)
            })
            .catch(next)
    }

    static create(req, res, next) { //Temporary (need to add input Category & image)
        const createdData = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image
        }

        Product.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static update(req, res, next) {
        const id = {
            _id: req.params.id
        }
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image
        }

        Product.findByIdAndUpdate(id, updatedData)
            .then(updated_data => {
                res.status(200).json(updated_data)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = {
            _id: req.params.id
        }

        Product.findByIdAndDelete(id)
            .then(deleted_data => {
                res.status(200).json(deleted_data)
            })
            .catch(next)
    }

    static searchProduct(req, res, next) {
        Product.find({name: new RegExp(req.params.keyword, 'i')})
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }


}

module.exports = ProductController