const { Product } = require("../models");
const deleteFile = require("../helpers/images").deleteFile;

class ProductController {
  static index(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products);
      })
      .catch(next);
  }

  static store(req, res, next) {
    const { name, stock, des, price } = req.body;
    let image;
    if (req.file && req.file.cloudStoragePublicUrl)
      image = req.file.cloudStoragePublicUrl;
    else image = "https://via.placeholder.com/300";
    Product.create({
      name,
      stock,
      des,
      price,
      image
    })
      .then(product => {
        res.status(201).json(product);
      })
      .catch(next);
  }

  static show(req, res, next) {
    const id = req.params.id;

    Product.findById(id).then(product => {
      if (product) res.status(200).json(product);
      else next({ httpStatus: 404, msg: "data not found" });
    });
  }

  static update(req, res, next) {
    console.log(req.body);
    const { id } = req.params;
    const { name, stock, des, price } = req.body;
    let image;
    if (req.file && req.file.cloudStoragePublicUrl)
      image = req.file.cloudStoragePublicUrl;

    Product.findByIdAndUpdate(
      id,
      {
        name,
        stock,
        des,
        price,
        image
      },
      {
        omitUndefined: true,
        new: false,
        useFindAndModify: false
      }
    )
      .then(product => {
        if (product.image && image) deleteFile(product.image);
        res.status(200).json({
          message: "update success"
        });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    let { id } = req.params;
    Product.findById(id)
      .then(product => {
        if (product.image) {
          deleteFile(product.image);
        }
        return Product.findByIdAndDelete(id);
      })
      .then(_ => {
        res.status(200).json({
          message: "delete success"
        });
      })
      .catch(next);
  }
}

module.exports = ProductController;
