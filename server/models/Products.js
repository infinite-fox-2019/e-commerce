const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
    name: {
      type: String,
      required: [true, "Product name is required"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min : [1,"Price cannot 0"]
    },
    quantity : {
      type : Number,
      required : [true, "Quantity is required"],
      min : [0,"Quantity cannot -1"]
    },
    detail : {
      type : String,
      required : [true, "Detail product is required"]
    },
    image : {
      type : String,
      default : ''
    }
  },
  {
    versionKey: false
  }
);

const Product = mongoose.model("Product", products);
module.exports = Product;
