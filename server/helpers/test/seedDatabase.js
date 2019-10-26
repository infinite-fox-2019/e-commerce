const { User, Product } = require("../../models");

let admin = {
  name: "admin",
  email: "admin@m.com",
  password: "secret",
  role: "admin"
};

let customer = {
  name: "customer",
  email: "customer@m.com",
  password: "secret",
  role: "customer"
};

let products = [
  {
    name: "sepatu one",
    des: "description sepatu one is the best ever sepatu you will ever get",
    price: 250000,
    stock: 12,
    image: "https://via.placeholder.com/300"
  },
  {
    name: "sepatu two",
    des: "description sepatu two is the best ever sepatu you will ever get",
    price: 125000,
    stock: 2,
    image: "https://via.placeholder.com/300"
  }
];

module.exports = function(done) {
  if (process.env.NODE_ENV === "test") {
    Promise.all([
      User.create(admin),
      User.create(customer),
      Product.insertMany(products)
    ])
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  }
};
