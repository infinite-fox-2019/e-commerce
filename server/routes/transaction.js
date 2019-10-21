const express = require("express");
const { TransactionController } = require("../controllers");
const Router = express.Router();
const {
  authentication,
  transactionAuthorization,
  adminAuthorization
} = require("../middlewares/auth.js");

Router.use(authentication);

Router.get("/all", adminAuthorization, TransactionController.findAll);

Router.route("/")
  .get(TransactionController.findByUser)
  .post(TransactionController.store);

Router.route("/:id")
  .get(transactionAuthorization, TransactionController.show)
  .patch(transactionAuthorization, TransactionController.update);

module.exports = Router;
