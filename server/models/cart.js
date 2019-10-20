const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

const CartSchema = new Schema({
    idProduct: { type: Schema.Types.ObjectId, ref: "Product" },
    nameProduct: String,
    imgUrl: String,
    idUser: { type: Schema.Types.ObjectId, ref: "User" },
    qty: Number,
    totalPrice : Number
}, {
        versionKey: false
    })

CartSchema.pre('save', function (next) {
    let productId = this.idProduct
    Product.findOne({ _id: productId })
        .then(product => {
            this.nameProduct = product.name
            this.imgUrl = product.imgUrl
            this.totalPrice = product.price * this.qty
            next();
        })
        .catch(err => {
            console.log(err.message);
        })
});

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart