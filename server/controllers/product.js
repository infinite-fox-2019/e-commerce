
const Product = require('../models/product');

class ProductController {
    static create(req, res, next) {
        if (!req.file) return next({ status: 400, message: "Image must be uploaded" })
        const { name, price, stock } = req.body
        let create = { name, price, stock }
        create.image = req.file.cloudStoragePublicUrl
        Product.create(create)
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next);
    };
    static read(req, res, next) {
        Product.find({}).sort({ createdAt: -1 })
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const id = req.params.id
        const { name, price, stock } = req.body
        let set = { name, price, stock }
        if (req.file) set.image = req.file.cloudStoragePublicUrl
        Product.findByIdAndUpdate(id, { $set: set }, { runValidators: true, new: true })
            .then((product) => {
                res.status(200).json(product)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Product.findByIdAndDelete(id)
            .then((product) => {
                res.status(200).json({ message: "Product deleted" })
            })
            .catch(next);
    };
};

module.exports = ProductController
