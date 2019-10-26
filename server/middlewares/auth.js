const { decodeToken } = require("../helpers/jsonwebtoken");
const { Transaction, User } = require("../models");

function authentication(req, res, next) {
  try {
    req.loggedInUser = decodeToken(req.headers.token);
    next();
  } catch (err) {
    next(err);
  }
}

function adminAuthorization(req, res, next) {
  if (req.loggedInUser.role === "admin") next();
  else
    next({
      httpStatus: 401,
      msg: "unauthorized"
    });
}

function transactionAuthorization(req, res, next) {
  let transactionId = req.params.id;

  Transaction.findById(transactionId).then(transaction => {
    if (transaction.customer == req.loggedInUser._id) next();
    else
      next({
        httpStatus: 401,
        msg: "unauthorized"
      });
  });
}

function cartAuthorization(req, res, next) {
  let userId = req.loggedInUser._id;
  User.findById(userId).then(user => {
    let filterCart = user.carts.filter(cart => cart._id == req.params.id);
    if (filterCart.length > 0) next();
    else
      next({
        httpStatus: 401,
        msg: "unauthorized"
      });
  });
}

module.exports = {
  authentication,
  adminAuthorization,
  transactionAuthorization,
  cartAuthorization
};
