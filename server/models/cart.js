const mongoose = require('mongoose')

let Schema = mongoose.Schema

let cartSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'users'},
    product_id: {type: Schema.Types.ObjectId, ref: 'products'}
}, {versionKey: false})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart