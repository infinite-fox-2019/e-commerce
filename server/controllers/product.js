
const Product = require('../models/product');

class ProductController {
    static create(req, res, next) {
        const { name, price, stock } = req.body
        const image = req.file.cloudStoragePublicUrl
        Product.create({ name, price, stock, image })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next);
    };
    static read(req, res, next) {
        Product.find({})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const id = req.params.id
        const { name, price, stock, image } = req.body
        Product.findByIdAndUpdate(id, { $set: { name, price, stock, image } }, { runValidators: true, new: true })
            .then((product) => {
                res.status(200).json(product)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Product.findByIdAndDelete(id)
            .then((product) => {
                res.status(200).json("Product deleted.")
            })
            .catch(next);
    };
};

module.exports = ProductController
