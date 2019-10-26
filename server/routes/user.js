const Router = require("express").Router();
const { UserController } = require("../controllers");
const { authentication, cartAuthorization } = require("../middlewares/auth");

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);
Router.get("/carts", authentication, UserController.getCart);
Router.patch("/carts/push", authentication, UserController.addCart);
Router.patch(
  "/carts/:id/set",
  authentication,
  cartAuthorization,
  UserController.updateCart
);
Router.patch(
  "/carts/:id/pull",
  authentication,
  cartAuthorization,
  UserController.deleteCart
);

Router.get("/isAdmin", authentication, (req, res, next) => {
  if (req.loggedInUser.role === "admin")
    res.status(200).json({ isAdmin: true });
  else res.status(200).json({ isAdmin: false });
});

module.exports = Router;
