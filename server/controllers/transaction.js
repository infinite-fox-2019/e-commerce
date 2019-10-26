const { User, Transaction, Product } = require("../models");

class TransactionController {
  static findAll(req, res, next) {
    Transaction.find()
      .then(transactions => {
        res.status(200).json(transactions);
      })
      .catch(next);
  }

  static findByUser(req, res, next) {
    const customer = req.loggedInUser._id;
    Transaction.find({
      customer
    })
      .then(transactions => {
        res.status(200).json(transactions);
      })
      .catch(next);
  }

  static store(req, res, next) {
    const id = req.loggedInUser._id;
    User.findById(id)
      .populate("carts.product")
      .then(user => {
        //check carts
        let items = [];
        if (user.carts.length < 1) {
          next({
            httpStatus: 400,
            msg: "cart is empty"
          });
        } else {
          //check stock
          let allAvailable = true;
          user.carts.forEach(el => {
            if (el.quantity > el.product.stock) {
              next({
                httpStatus: 400,
                msg: `${el.product.name} is out of stock`
              });
              allAvailable = false;
            }
          });

          if (allAvailable) {
            //make transaction items && reduce stock
            user.carts.forEach(el => {
              items.push({
                product: el.product,
                name: el.product.name,
                image: el.product.image,
                price: el.product.price,
                des: el.product.des,
                quantity: el.quantity
              });

              Product.findByIdAndUpdate(
                el.product,
                {
                  $inc: {
                    stock: -el.quantity
                  }
                },
                {
                  new: true
                }
              ).catch(next);
            });

            Transaction.create({
              customer: user._id,
              items: items,
              status: "paid"
            })
              .then(transaction => {
                return User.findByIdAndUpdate(id, {
                  carts: []
                });
              })
              .then(user => {
                res.status(201).json({
                  message: "success create transaction"
                });
              })
              .catch(next);
          }
        }
      })
      .catch(next);
  }

  static show(req, res, next) {
    const id = req.params.id;

    Transaction.findById(id)
      .then(transaction => {
        res.status(200).json(transaction);
      })
      .catch(next);
  }

  static update(req, res, next) {
    const id = req.params.id;

    Transaction.findByIdAndUpdate(id, {
      status: "accepted"
    })
      .then(transaction => {
        res.status(200).json({
          message: "products has accepted by customer"
        });
      })
      .catch(next);
  }
}

module.exports = TransactionController;
