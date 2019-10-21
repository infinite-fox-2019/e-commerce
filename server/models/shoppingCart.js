const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const shoppingCartSchema = new Schema ({
    items : [{
        type : ObjectId,
        ref : 'Product'
    }],
    owner : {
        type : ObjectId,
        ref : 'User'
    }
})

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema)

module.exports = ShoppingCart