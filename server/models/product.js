const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"]
    },
    image: {
      type: String,
      required: [true, "image is required"]
    },
    price: {
      type: Number,
      required: [true, "price is required"]
    },
    stock: {
      type: Number,
      required: [true, "stock is required"]
    },
    des: {
      type: String,
      required: [true, "description is required"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
