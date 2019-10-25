const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    stock: Number,
    price: {
        type: Number,
        required: true
    },
    createdAt : Date,
    brand: String,
    image: {
        type: String,
        required: true
    }
})

ProductSchema.pre('save',function(next){
    this.createdAt = new Date()
    this.stock = 15 || this.stock
    next()
})
ProductSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Brand.remove({client_id: this._id}).exec();
    next();
});
const product = Mongoose.model('products',ProductSchema);

product.createCollection()
    .then(_=>{
        console.log('Product Collection now Created!');
    })
    .catch(console.log);

module.exports = product