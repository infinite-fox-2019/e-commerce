const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { User, Product } = require("../models/");
const seedDatabase = require("../helpers/test/seedDatabase");

chai.use(chaiHttp);
const expect = chai.expect;

//middleware testing
before(done => {
  seedDatabase(done);
});

//testing case
describe("User Routes", () => {
  //get customer token
  before(done => {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "customer@m.com",
        password: "secret"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an("object")
          .to.have.any.keys("token");
        customerToken = res.body.token;
        done();
      });
  });
  //register route
  describe("POST /users/register", () => {
    //success skenario
    describe("Success Register", () => {
      it("should send an object (token) with 201 status code", done => {
        chai
          .request(app)
          .post("/users/register")
          .send({
            name: "user",
            email: "user@m.com",
            password: "secret"
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("token");
            done();
          });
      });
    });

    //Failed scenario
    describe("Failed Register", () => {
      it("should send an object (message) with 400 status code", done => {
        chai
          .request(app)
          .post("/users/register")
          .send({
            name: "user",
            email: "user@m.com",
            password: "secret"
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message[0]).to.equal("email already registered");
            done();
          });
      });
    });
  });

  //login route
  describe("POST /users/login", () => {
    //success skenario
    describe("Success Login", () => {
      it("should send an object (token) with 200 status code", done => {
        chai
          .request(app)
          .post("/users/login")
          .send({
            email: "user@m.com",
            password: "secret"
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("token");
            token = res.body.token;
            done();
          });
      });
    });
    //failed scenario
    describe("Failed Login", () => {
      it("should send an object (message) with 400 status code", done => {
        chai
          .request(app)
          .post("/users/login")
          .send({
            email: "user@m.com",
            password: "wrongpassword"
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message[0]).to.equal(
              "invalid username / password !"
            );
            done();
          });
      });
    });
  });

  //GET Carts
  describe("GET /users/isAdmin", () => {
    before(done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: "admin@m.com",
          password: "secret"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body)
            .to.be.an("object")
            .to.have.any.keys("token");
          adminToken = res.body.token;
          done();
        });
    });
    //success skenario
    describe("Success get isAdmin", () => {
      it("should send an object (isAdmin) with 200 status code", done => {
        chai
          .request(app)
          .get("/users/isAdmin")
          .set("token", adminToken)
          .send({})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.isAdmin).to.be.true;
            done();
          });
      });
    });

    //failed skenario
    describe("Failed get isAdmin", () => {
      it("should send an object (isAdmin) with 200 status code", done => {
        chai
          .request(app)
          .get("/users/isAdmin")
          .set("token", token)
          .send({})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.isAdmin).to.be.false;
            done();
          });
      });
    });
  });

  //GET Carts
  describe("GET /users/carts", () => {
    //success skenario
    describe("Success Get Carts", () => {
      it("should send an array with 200 status code", done => {
        chai
          .request(app)
          .get("/users/carts")
          .set("token", token)
          .send({})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });
  });

  //Patch Push Cart
  describe("PATCH /users/carts/push", () => {
    //success skenario
    describe("Success Push Carts", () => {
      it("should send an object (message) with 200 status code", done => {
        Product.find({}).then(products => {
          chai
            .request(app)
            .patch("/users/carts/push")
            .set("token", token)
            .send({
              product: products[0]._id,
              quantity: 5
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body)
                .to.be.an("object")
                .to.have.any.keys("message");
              expect(res.body.message).to.equal("success add an item to cart");
              done();
            });
        });
      });
    });
  });

  //Patch Set Cart
  describe("PATCH /users/carts/:id/set", () => {
    //success skenario
    describe("Success Set Carts", () => {
      it("should send an object (message) with 200 status code", done => {
        User.find({}).then(users => {
          cartId = users[2].carts[0]._id;
          chai
            .request(app)
            .patch(`/users/carts/${cartId}/set`)
            .set("token", token)
            .send({
              quantity: 10
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body)
                .to.be.an("object")
                .to.have.any.keys("message");
              expect(res.body.message).to.equal("success update a cart item");
              done();
            });
        });
      });
    });

    //failed skenario
    describe("Failed Set Carts", () => {
      it("should send an object (message) with 401 status code", done => {
        User.find({}).then(users => {
          cartId = users[2].carts[0]._id;
          chai
            .request(app)
            .patch(`/users/carts/${cartId}/set`)
            .set("token", customerToken)
            .send({
              quantity: 10
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(401);
              expect(res.body)
                .to.be.an("object")
                .to.have.any.keys("message");
              expect(res.body.message[0]).to.equal("unauthorized");
              done();
            });
        });
      });
    });
  });

  //Patch Pull Cart
  describe("PATCH /users/carts/:id/pull", () => {
    //failed skenario
    describe("Success Pull Carts", () => {
      it("should send an object (message) with 401 status code", done => {
        User.find({}).then(users => {
          cartId = users[2].carts[0]._id;
          chai
            .request(app)
            .patch(`/users/carts/${cartId}/pull`)
            .set("token", customerToken)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(401);
              expect(res.body)
                .to.be.an("object")
                .to.have.any.keys("message");
              expect(res.body.message[0]).to.equal("unauthorized");
              done();
            });
        });
      });
    });

    //success skenario
    describe("Success Pull Carts", () => {
      it("should send an object (message) with 200 status code", done => {
        User.find({}).then(users => {
          cartId = users[2].carts[0]._id;
          chai
            .request(app)
            .patch(`/users/carts/${cartId}/pull`)
            .set("token", token)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body)
                .to.be.an("object")
                .to.have.any.keys("message");
              expect(res.body.message).to.equal("success delete a cart item");
              done();
            });
        });
      });
    });
  });
});
