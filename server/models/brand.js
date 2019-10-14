const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const BrandSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    ProductId:[
        {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
})

const Brand = Mongoose.model('brands',BrandSchema);

Brand.createCollection()
    .then(_=>{
        console.log(`Brand Collection success created!`);
    })
    .catch(console.log);

module.exports = Brand;