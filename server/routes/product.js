const express = require("express");
const { ProductController } = require("../controllers");
const images = require("../helpers/images");
const { authentication, adminAuthorization } = require("../middlewares/auth");

const Router = express.Router();

Router.route("/")
  .get(ProductController.index)
  .post(
    authentication,
    adminAuthorization,
    images.multer.single("image"),
    images.sendUploadToGCS,
    ProductController.store
  );

Router.route("/:id")
  .get(ProductController.show)
  .patch(
    authentication,
    adminAuthorization,
    images.multer.single("image"),
    images.sendUploadToGCS,
    ProductController.update
  )
  .delete(authentication, adminAuthorization, ProductController.delete);

module.exports = Router;
