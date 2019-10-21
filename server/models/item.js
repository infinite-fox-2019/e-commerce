const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Name is required']
  },
  featured_image:{
    type : String,
    required : [true, 'Image is required']
  },
  description : {
    type : String,
    required : [true, 'Description is required']
  },
  stock : {
      type: Number,
      require : [true , 'Stock is required'],
      min : [1, 'minium item to sell is 1']
  },
  price : {
      type : Number,
      require : [true , 'Stock is required'],
      min : [1000, 'minium item price to sell is 1000']
  },
  tags : [{
    type: String
  }]
},{
    timestamps: true,
    versionKey: false
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item