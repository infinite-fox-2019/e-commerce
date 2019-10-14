const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const clearDatabase = require("../helpers/test/clearDatabase")

chai.use(chaiHttp);

after(function (done) {
    this.timeout(10000)
    console.log("after in user test")
    clearDatabase(done);
});

describe("User tests", function () {
    this.timeout(10000)
    describe("POST /user/register", function () {
        it("success register user with status 201", function (done) {
            let user = {
                name: "Maulana Ghozi",
                email: "ghozi@gmail.com",
                password: "12345",
                role: 'buyer'
            };

            chai
                .request(app)
                .post("/user/register")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object")
                    expect(res.body.name).to.be.a("string")
                    expect(res.body.email).to.be.a("string")
                    expect(res.body.password).to.be.a("string")
                    expect(res.body.wishlist).to.be.an("array")
                    expect(res.body.role).to.be.a("string")
                    expect(res.body.name).to.equal(user.name)
                    expect(res.body.email).to.equal(user.email)
                    expect(res.body.password).to.not.equal(user.password)
                    expect(res.body).to.have.keys(['_id', 'name', 'email', "password", "role", "wishlist", "transaction"]);
                    done()
                });
        });

        it("Should error register user with invalid email and password (status: 400)", function (done) {
            let user = {
                name: "Maulana Ghozi",
                email: "ghozi",
                password: "1234",
                role: "buyer"
            };
            chai
                .request(app)
                .post("/user/register")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('Please provide a valid email. Minimum password length is 5')
                    done()
                })
        })

        it("Should error register user with empty body (status: 400)", function (done) {

            chai
                .request(app)
                .post("/user/register")
                .send({})
                .end(function (err, res) {
                    console.log(res.body.message)
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal("Name must be filled. Email must be filled. Password must be filled. Path `role` is required.")
                    done()
                })
        })

        it("Should error register user with duplicate email; (status: 400)", function (done) {

            let user = {
                name: 'Maulana Ghozi',
                email: "ghozi@gmail.com",
                password: "12345",
                role: "buyer"
            }

            chai
                .request(app)
                .post("/user/register")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('Email already registered.')
                    done()
                })
        })
    });

    describe("POST /user/login", function () {
        it("Success login with status 200", function (done) {
            let user = {
                email: "ghozi@gmail.com",
                password: "12345"
            };
            chai
                .request(app)
                .post("/user/login")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys("token")
                    done();
                })
        })
        it("Login Failed: wrong email with status 401", function (done) {
            let user = {
                "email": "ghozi@email.com",
                "password": "12345",
            }
            chai
                .request(app)
                .post("/user/login")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('Invalid email/password')
                    done()
                })
        })
        it("Login Failed: wrong password with status 401", function (done) {
            let user = {
                email: "ghozi@gmail.com",
                password: "123456"
            };
            chai
                .request(app)
                .post("/user/login")
                .send(user)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('Invalid email/password')
                    done()
                })
        })
    })
});