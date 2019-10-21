const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { User, Product } = require("../models/");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Product Routes", () => {
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

  //GET Products
  describe("GET /products", () => {
    //success skenario
    describe("Success GET products", () => {
      it("should send an array with 200 status code", done => {
        chai
          .request(app)
          .get("/products")
          .set("token", adminToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });
  });

  //POST Products
  describe("POST /products", () => {
    //success skenario
    describe("Success POST products", () => {
      it("should send an object of created product with 201 status code", done => {
        chai
          .request(app)
          .post("/products")
          .set("token", adminToken)
          .send({
            name: "sepatu test",
            des:
              "description sepatu test is the best ever sepatu you will ever get",
            price: 420000,
            stock: 3
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            productId = res.body._id;
            done();
          });
      });
    });

    //fail skenario
    describe("Fail POST products", () => {
      it("should send an object with 400 status code", done => {
        chai
          .request(app)
          .post("/products")
          .set("token", adminToken)
          .send({
            des:
              "description sepatu test is the best ever sepatu you will ever get",
            price: 420000,
            stock: 3
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });

  //Show Products
  describe("GET /products/:id", () => {
    //success skenario
    describe("Success Show products", () => {
      it("should send an object of a product with 200 status code", done => {
        chai
          .request(app)
          .get(`/products/${productId}`)
          .set("token", adminToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });

  //Update Products
  describe("PATCH /products/:id", () => {
    //success skenario
    describe("Success Update products", () => {
      it("should send an object (message) with 200 status code", done => {
        chai
          .request(app)
          .patch(`/products/${productId}`)
          .send({
            name: "sepatu test update",
            des:
              "description sepatu test is the best ever sepatu you will ever get",
            price: 120000,
            stock: 6
          })
          .set("token", adminToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("update success");
            done();
          });
      });
    });
    //fail skenario
    describe("Fail Update products", () => {
      it("should send an object (message) with 401 status code", done => {
        chai
          .request(app)
          .patch(`/products/${productId}`)
          .send({
            name: "sepatu test update",
            des:
              "description sepatu test is the best ever sepatu you will ever get",
            price: 120000,
            stock: 6
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });

  //Delete Products
  describe("DELETE /products/:id", () => {
    //success skenario
    describe("Success Delete products", () => {
      it("should send an object (message) with 200 status code", done => {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .set("token", adminToken)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("delete success");
            done();
          });
      });
    });

    //fail skenario
    describe("fail Delete products", () => {
      it("should send an object (message) with 401 status code", done => {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });
});
