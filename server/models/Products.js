const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
    name: {
      type: String,
      required: [true, "Product name is required"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"]
    }
  },
  {
    versionKey: false
  }
);

const Product = mongoose.model("Product", products);
module.exports = Product;
