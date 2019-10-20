const Cart = require("../models/Cart")
const Product = require("../models/Product")

class CartController {
    static create (req, res, next) {
        let { countProduct, _id } = req.body
        let BuyerId = req.loggedUser.id
        Cart.create({
            countProduct,
            BuyerId,
            product: _id
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        let BuyerId = req.loggedUser.id
        Cart.find({
            BuyerId
        })
        .populate("product")
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let { id } = req.params
        Cart.findOneAndDelete({
            _id: id
        })
        .then ((result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static checkout (req, res, next) {
        let id = req.loggedUser.id
        let arrTemp = []
        let temp = 0
        let sold = 0
        Cart.find({
            BuyerId: id
        })
        .then (result => {
            // console.log(result)
            for (let i = 0; i < result.length; i++) {
                temp += result[i].price
                arrTemp.push({
                    _id: result[i].product,
                    count: result[i].countProduct,
                    price: result[i].price
                })
            }
            return arrTemp
        })
        .then (() => {
            async function tes() {
                for (let i = 0; i < arrTemp.length; i++) {
                    // console.log(arrTemp[i]._id)
                    await Product.findOne({
                        _id: arrTemp[i]._id
                    })
                    .then (async result => {
                        // console.log(result.stock)
                        arrTemp[i].stokAwal = result.stock
                        arrTemp[i].stokSisa = result.stock - arrTemp[i].count
                        arrTemp[i].nama = result.product
                        arrTemp[i].sold = result.sold + arrTemp[i].count
                        // console.log(arrTemp[i].stokAwal)
                        return arrTemp
                    })
                    .catch (err => {
                        next(err)
                    })
                }
            }
            return tes()
        })
        .then (() => {
            async function updateProduct() {
                for (let i = 0; i < arrTemp.length; i++) {
                    await Product.findOneAndUpdate({
                        _id: arrTemp[i]._id
                    }, {
                        stock: arrTemp[i].stokSisa,
                        sold: arrTemp[i].sold
                    })
                }
            }
            return updateProduct()
        })
        .then (() => {
            Cart.deleteMany({
                BuyerId: req.loggedUser.id
            })
            .then (() => {
                res.status(200).json({
                    msg: "Berhasil Checkout",
                    TotalPrice: temp,
                    TotalProduct: arrTemp
                })
            })
        })
        .catch (err => {
            next(err)
        })
        
    }
}

module.exports = CartController