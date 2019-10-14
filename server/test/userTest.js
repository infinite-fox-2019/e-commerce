const chaiHttp = require("chai-http");
const User = require("../models/User");
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;

chai.use(chaiHttp);

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
            expect(element).to.have.all.keys(
              "_id",
              "username",
              "email",
              "password"
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
