const Product = require('../models/product')
const Cart = require('../models/cart')
const keySearch = require('../helpers/keySearch')
const getObjUpdate = require('../helpers/getObjUpdate')
const gcsDelete = require('../helpers/deleteFileGcs')


class ProductController{
    static addProduct(req, res, next) {
        if (!req.file) return next({ status: 400, message: "Image must be set" })
        let { name, description, price, stock } = req.body
        let category = req.body.category.split(' ')
        let imgUrl = req.file.cloudStoragePublicUrl

        Product.create({
            name,
            description,
            category,
            price,
            stock,
            imgUrl
        })
            .then(product => {
                res.status(201).json(product)
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
        let id = req.params.id
        Product.findById({ _id: id })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static searchProduct(req, res, next) {
        let key = keySearch(req.query)
        Product.find(key)
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static editProduct(req, res, next) {
        let productId = req.params.id
        let dataUpdate = getObjUpdate(req.body)
        Product.updateOne({ _id: productId }, dataUpdate)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        let id = req.params.id
        Product.findById(id)
            .then(result => {
                gcsDelete(result.imgUrl)
                return Product.findByIdAndDelete(id)
            })
            .then(() => {
                res.status(200).json("Product deleted.")
            })
            .catch(next);
    }

    static addToCart(req, res, next) {
        let { id } = req.logedUser
        let { qty } = req.body
        let { idProduct } = req.params
        Cart.create({
            idUser: id,
            idProduct,
            qty
        })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(next)
    }

    static showCart(req, res, next) {
        let { id } = req.logedUser
        Cart.find({idUser: id})
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static deleteCart(req, res, next) {
        let id = req.params.id
        Cart.deleteOne({_id: id})
            .then(respon => {
                res.status(200).json(respon)
            })
            .catch(next)
    }
}

module.exports = ProductController