const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { Product, Transaction } = require("../models/");
const clearDatabase = require("../helpers/test/clearDatabase");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Transaction Router", () => {
  before(function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "admin@m.com",
        password: "secret"
      })
      .end(function(err, res) {
        adminToken = res.body.token;
        done();
      });
  });

  before(function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "customer@m.com",
        password: "secret"
      })
      .end(function(err, res) {
        customerToken = res.body.token;
        done();
      });
  });

  //GET Transactions
  describe("GET /transactions/all", () => {
    //success skenario
    describe("Success GET all transactions", () => {
      it("should send an array with 200 status code", done => {
        chai
          .request(app)
          .get("/transactions/all")
          .set("token", adminToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });

    //fail skenario
    describe("Fail GET all transactions", () => {
      it("should send an array with 401 status code", done => {
        chai
          .request(app)
          .get("/transactions/all")
          .set("token", customerToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });

  //GET Transactions
  describe("GET /transactions", () => {
    //success skenario
    describe("Success GET transactions", () => {
      it("should send an array with 200 status code", done => {
        chai
          .request(app)
          .get("/transactions")
          .set("token", customerToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });
    //fail skenario
    describe("Fail GET transactions", () => {
      it("should send an object with 401 status code", done => {
        chai
          .request(app)
          .get("/transactions")
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });

  //POST Transactions
  describe("POST /transactions", () => {
    //success skenario
    describe("Success POST transactions", () => {
      before(function(done) {
        Product.find({}).then(products => {
          chai
            .request(app)
            .patch("/users/carts/push")
            .set("token", customerToken)
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
      it("should send an object with 200 status code", done => {
        chai
          .request(app)
          .post("/transactions")
          .set("token", customerToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("success create transaction");

            done();
          });
      });
    });
  });

  //SHOW Transactions
  describe("SHOW /transactions/:id", () => {
    //success skenario
    describe("Success Show transactions", () => {
      it("should send an object with 200 status code", done => {
        Transaction.findOne({}).then(transaction => {
          chai
            .request(app)
            .get(`/transactions/${transaction._id}`)
            .set("token", customerToken)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              done();
            });
        });
      });
    });
  });

  //Update Transactions
  describe("UPDATE /transactions/:id", () => {
    //success skenario
    describe("Success Update transactions", () => {
      it("should send an object with 200 status code", done => {
        Transaction.findOne({}).then(transaction => {
          chai
            .request(app)
            .patch(`/transactions/${transaction._id}`)
            .set("token", customerToken)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body.message).to.equal(
                "products has accepted by customer"
              );
              done();
            });
        });
      });
    });
  });
});

//delete data after testing
after(done => {
  clearDatabase(done);
});
