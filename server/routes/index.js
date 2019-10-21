const Router = require("express").Router();
const user = require("./user");
const product = require("./product");
const transaction = require("./transaction");

Router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to obral sepatu"
  });
});

Router.use("/users", user);
Router.use("/products", product);
Router.use("/transactions", transaction);

module.exports = Router;
