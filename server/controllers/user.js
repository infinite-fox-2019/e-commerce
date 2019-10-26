const { User } = require("../models");
const { compareHash } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jsonwebtoken");

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password,
      role: "customer"
    })
      .then(user => {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        let token = generateToken(payload);
        res.status(201).json({
          token
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then(user => {
        if (!user || !compareHash(password, user.password)) {
          next({
            httpStatus: 400,
            msg: `invalid username / password !`
          });
        } else {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          };

          let token = generateToken(payload);

          res.status(200).json({
            token
          });
        }
      })
      .catch(next);
  }

  static getCart(req, res, next) {
    const id = req.loggedInUser;

    User.findById(id)
      .populate("carts.product")
      .then(user => {
        res.status(200).json(user.carts);
      })
      .catch(next);
  }

  static addCart(req, res, next) {
    const id = req.loggedInUser._id;

    User.findByIdAndUpdate(
      id,
      {
        $push: {
          carts: {
            product: req.body.product,
            quantity: req.body.quantity
          }
        }
      },
      {
        omitUndefined: true
      }
    )
      .then(user => {
        res.status(200).json({
          message: "success add an item to cart"
        });
      })
      .catch(next);
  }

  static updateCart(req, res, next) {
    const id = req.loggedInUser._id;
    const cartId = req.params.id;

    User.updateOne(
      { _id: id, "carts._id": cartId },
      {
        $set: {
          "carts.$.quantity": req.body.quantity
        }
      }
    )
      .then(user => {
        if (user.nModified == 0) {
          next({ httpStatus: 404, msg: "data not found" });
        } else {
          res.status(200).json({
            message: "success update a cart item"
          });
        }
      })
      .catch(next);
  }

  static deleteCart(req, res, next) {
    const id = req.loggedInUser._id;
    const cartId = req.params.id;

    User.findByIdAndUpdate(
      id,
      {
        $pull: {
          carts: { _id: cartId }
        }
      },
      {
        new: false
      }
    )
      .then(user => {
        if (!user.carts.find(el => el._id.toString() == cartId)) {
          next({ httpStatus: 404, msg: "data not found" });
        } else {
          res.status(200).json({
            message: "success delete a cart item"
          });
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
