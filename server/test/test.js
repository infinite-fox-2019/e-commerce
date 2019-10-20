const chaiHttp = require("chai-http");
const Product = require('../models/Products')
const User = require("../models/User");
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;

chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTcxMTE5NzQ1fQ.HVQawsnc7zsvs4IbwcbxOFGo_-0WxVlEaUajRQOCFd0"

before(function() {
  return User.deleteMany();
});
describe("User Model Testing", () => {
  it("should register without error", done => {
    let body = {
      username: "nadhil",
      email: "nadhils@nadhil.com",
      password: "nadhil"
    };
    chai
      .request(app)
      .post("/users/add")
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token')
        done();
      });
  });

  it("should error with status code 400 (invalid input format)", done => {
    let body = {
      username: "",
      email: "",
      password: ""
    };
    chai
      .request(app)
      .post("/users/add")
      .send(body)
      .end((err, res) => {
        expect(res).to.have.status(400);
        if (typeof res.body === "string") {
          expect(res.body).to.equal("Password cannot empty");
        } else {
          expect(res.body[0]).to.equal("username is required");
          expect(res.body[1]).to.equal("email is required");
          expect(res.body[2]).to.equal("password is required");
        }
        done();
      });
  });

  it("should error with status code 400 (Email already in use)", done => {
    let body = {
      username: "admin",
      email: "nadhils@nadhil.com",
      password: "nadhil"
    };
    chai
      .request(app)
      .post("/users/add")
      .send(body)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.equal("Email already in use");
        done();
      });
  });

  it("should error with status code 400 (Email format is invalid)", done => {
    let body = {
      username: "admin",
      email: "nadhilnadhilcom",
      password: "nadhil"
    };
    chai
      .request(app)
      .post("/users/add")
      .send(body)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body[0]).to.equal("Email format is invalid");
        done();
      });
  });

  describe("find all user", () => {
    it("should return all user with status code 200", done => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          res.body.forEach(element => {
            expect(element).to.have.property("username");
            expect(element).to.have.property("email");
            expect(element).to.have.property("password");
            expect(element).to.have.property("admin");
            expect(element).to.have.all.keys(
              "_id",
              "username",
              "email",
              "password",
              "admin",
              "cart"
            );
          });
          done();
        });
    User.find().then(users => {
      describe("update user", () => {
        it("should return json file with updated status", done => {
          let body = {
            username: "admin",
            email: "inihasi@baru.com"
          };
          chai
            .request(app)
            .patch(`/users/${users[0]._id}`)
            .send(body)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.be.an("object");
              expect(res.body.n).to.equal(1);
              expect(res.body.nModified).to.equal(1);
              expect(res.body.ok).to.equal(1);
              expect(res).to.have.status(200);
              done();
            });
        });
        describe("login user", () => {
          it("should return token with status 200", done => {
            let body = {
              email: "inihasi@baru.com",
              password: "nadhil"
            };
            chai
              .request(app)
              .post("/users/login")
              .send(body)
              .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.an("object");
                expect(res.body).to.have.property('token')
                expect(res).to.have.status(200);
                done();
              });
          });
        });

        describe("add id to cart",()=>{
          it('should return object updated report with status 200',done=>{
            let body = {
              productId : '5da5d8bd7da1bb3e1df36e51',
              qty : '2'
            }
            chai
              .request(app)
              .patch(`/users/${users[0]._id}/addcart`)
              .send(body)
              .set('token',token)
              .end((err,res)=>{
                expect(err).to.be.null
                expect(res).to.be.an("object")
                expect(res).to.have.status(200);
                expect(res.body.n).to.equal(1);
                expect(res.body.nModified).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done()
              })
          })
        })

        describe("add id to cart",()=>{
          it('should return object updated report with status 200',done=>{
            let body = {
              productId : '5da5d9b5c298493f61881a53',
              qty : '5'
            }
            chai
              .request(app)
              .patch(`/users/${users[0]._id}/addcart`)
              .send(body)
              .set('token',token)
              .end((err,res)=>{
                expect(err).to.be.null
                expect(res).to.be.an("object")
                expect(res).to.have.status(200);
                expect(res.body.n).to.equal(1);
                expect(res.body.nModified).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done()
              })
          })
        })

        describe("remove a product from cart all",()=>{
          it('should return object updated report with status 200',done=>{
            let body = {
              productId : '5da5d9b5c298493f61881a53'
            }
            chai
              .request(app)
              .patch(`/users/${users[0]._id}/updcart`)
              .send(body)
              .set('token',token)
              .end((err,res)=>{
                expect(err).to.be.null
                expect(res).to.be.an("object")
                expect(res).to.have.status(200);
                expect(res.body.n).to.equal(1);
                expect(res.body.nModified).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done()
              })
          })
        })


        describe("checkout user (remove all cart and updating product model)",()=>{
          it('should remove all items in cart and updating product model',done=>{
            chai
              .request(app)
              .patch(`/users/${users[0]._id}/checkout`)
              .set('token',token)
              .end((err,res)=>{
                expect(err).to.be.null
                expect(res.body).to.equal("Checkout berhasil")
                expect(res).to.have.status(200);
                done()
              })
          })
        })

        describe("delete user",()=>{
          it("should return object report with status 200",done=>{
            chai
              .request(app)
              .delete(`/users/${users[0]._id}`)
              .end((err,res)=>{
                expect(err).to.be.null
                expect(res).to.be.an("object")
                expect(res).to.have.status(200);
                expect(res.body.n).to.equal(1);
                expect(res.body.deletedCount).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done()
              })
          })
        })
      });
    });
  });
});
});


let objectId

describe('Product model testing',()=>{
  it('should add new product without error and status 200',(done)=>{
    let body = {
      name : 'Jam tangan',
      price : 80000,
      quantity : 20,
      detail : 'Ini jam tangan'
    }
    chai
      .request(app)
      .post('/products/add')
      .send(body)
      .set('token',token) // nanti diganti jadi token (dari client bentuknya object)
      .end((err,res)=>{
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        objectId = res.body._id
        expect(res.body).have.all.keys('_id','name','price','quantity','detail','image')
        expect(res).to.have.status(200)
        done()
      })    
  })

  it('should error with status code 400 (product cannot be empty)',(done)=>{
    let body = {
      name :'',
      price : '',
      quantity : '',
      detail : ''
    }
    chai
      .request(app)
      .post('/products/add')
      .send(body)
      .set('token',token)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.equal('Product name is required')
        expect(res.body[1]).to.equal('Price is required')
        expect(res.body[2]).to.equal('Quantity is required')
        expect(res.body[3]).to.equal('Detail product is required')
        done()
      })
  })

  it('should error with status code 400 (price cannot 0)',(done)=>{
    let body = {
      name :'jam',
      price : '0',
      quantity : '20',
      detail : 'jam tangan'
    }
    chai
      .request(app)
      .post('/products/add')
      .send(body)
      .set('token',token)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body[0]).to.equal('Price cannot 0')
        done()
      })
  })
  it('should error with status code 400 (quantity cannot -1)',(done)=>{
    let body = {
      name :'jam',
      price : '10000',
      quantity : '-1',
      detail : 'jam tangan'
    }
    chai
      .request(app)
      .post('/products/add')
      .send(body)
      .set('token',token)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        expect(res.body[0]).to.equal('Quantity cannot -1')
        done()
      })
  })
  it('should update a product without error and status 200',(done)=>{
    let body = {
    name : 'Jam tangan',
    price : 80000,
    quantity : 50,
    detail : 'Ini jam tangan'
  }
  chai
  .request(app)
    .patch(`/products/${objectId}`)
    .send(body)
    .set('token',token) // nanti diganti jadi token (dari client bentuknya object)
    .end((err,res)=>{
      expect(err).to.be.null
      expect(res.body).to.be.an('object')
      expect(res.body.n).to.equal(1);
      expect(res.body.nModified).to.equal(1);
      expect(res.body.ok).to.equal(1);
      expect(res).to.have.status(200)
      done()
    })    
  })

  it('should delete a product without error and status 200',(done)=>{
  chai
  .request(app)
    .delete(`/products/${objectId}`)
    .set('token',token) // nanti diganti jadi token (dari client bentuknya object)
    .end((err,res)=>{
      expect(err).to.be.null
      expect(res.body).to.be.an('object')
      expect(res.body.n).to.equal(1);
      expect(res.body.deletedCount).to.equal(1);
      expect(res.body.ok).to.equal(1);
      expect(res).to.have.status(200)
      done()
    })    
  })







})


// after (function(){
//   return Product.deleteMany()
// })



