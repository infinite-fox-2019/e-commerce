const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app.js")
const User = require("../models/User")

const expect = chai.expect
chai.use(chaiHttp)

var token

describe("User Test", function() {
    
    after(function(done) {
        this.timeout(10000)
        User.deleteMany(() => {
            done()
        })
    })

    describe("/register", function() {
        it("should return email, password, objectId", function(done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123aas",
                role: "Seller"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end(function (err, res){
                    // console.log(err, res)
                    expect(err).to.be.null
                    expect(res.status).to.be.equal(201)
                    expect(res.body).to.have.all.keys("email", "password", "_id", "role")
                    done() 
                })   
        })

        it("should return error message 'Email can't be empty' ", function(done) {
            this.timeout(10000)
            let body = {
                // email: "test@mail.com",
                password: "123aas",
                role: "Seller"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end((err, res) => {
                    expect(res.body).to.be.not.null
                    console.log(res.body)
                    expect(res.status).to.be.equal(400)
                    // expect(res.body).to.have.all.keys("email", "password", "_id")
                    done() 
                })   
        })

        it("should return error message 'Password can't be empty' ", function(done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                // password: "123aas",
                role: "admin"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end((err, res) => {
                    expect(res.body).to.be.not.null
                    console.log(res.body)
                    expect(res.status).to.be.equal(400)
                    // expect(res.body).to.have.all.keys("email", "password", "_id")
                    done() 
                })   
        })

        it("should return error message 'You must choose your role' ", function(done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123aas",
                // role: "admin"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end((err, res) => {
                    expect(res.body).to.be.not.null
                    console.log(res.body)
                    expect(res.status).to.be.equal(400)
                    // expect(res.body).to.have.all.keys("email", "password", "_id")
                    done() 
                })   
        })

        it("should return error message 'Minimum password is 5 characters length' ", function(done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123s",
                role: "admin"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end((err, res) => {
                    expect(res.body).to.be.not.null
                    console.log(res.body)
                    expect(res.status).to.be.equal(400)
                    // expect(res.body).to.have.all.keys("email", "password", "_id")
                    done() 
                })   
        })

        it("should return error message 'Email already registered' ", function(done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123aas",
                role: "admin"
            }
            chai.request(app)
                .post("/register") 
                .send(body)
                .end((err, res) => {
                    expect(res.body).to.be.not.null
                    console.log(res.body)
                    expect(res.status).to.be.equal(400)
                    // expect(res.body).to.have.all.keys("email", "password", "_id")
                    done() 
                })   
        })            
    })

    describe("/login", function() {
        it("should return token", function (done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123aas"
            }
            // let headers = {
            //     token: token
            // }
            chai.request(app)
                .post("/login") 
                .send(body)
                .end(function (err, res){
                    // console.log(res.body)
                    expect(err).to.be.null
                    expect(res.status).to.be.equal(200)
                    expect(res.body).to.have.all.keys("token")
                    token = res.body.token
                    console.log(token)
                    done() 
                })
        })

        it("should return error message 'Password Salah' ", function (done) {
            this.timeout(10000)
            let body = {
                email: "test@mail.com",
                password: "123aasas"
            }
            chai.request(app)
                .post("/login") 
                .send(body)
                .end(function (err, res){
                    expect(res.body).to.be.not.null
                    // console.log(err, res)
                    // expect(err).to.be.null
                    expect(res.status).to.be.equal(404)
                    // expect(res.body).to.have.all.keys("toke)
                    done() 
                })
        })

        it("should return error message 'Email Salah' ", function (done) {
            this.timeout(10000)
            let body = {
                email: "tes@mail.com",
                password: "123aas"
            }
            chai.request(app)
                .post("/login") 
                .send(body)
                .end(function (err, res){
                    expect(res.body).to.be.not.null
                    // console.log(err, res)
                    // expect(err).to.be.null
                    expect(res.status).to.be.equal(404)
                    // expect(res.body).to.have.all.keys("toke)
                    done() 
                })
        })
    })

    describe("/product", function () {
        
        it("should return array of object", function () {
            this.timeout(10000)
            console.log(token)
            let headers = {
                token: token
            }
            chai.request(app)
                .get("/product")
                .set(headers)
                .end( function (err, res) {
                    expect(err).to.be.null
                    expect(res.status).to.be.equal(200)
                    // expect(res.body).to.have.all.keys("token")
                    // token = res.body.token
                    console.log(res.body)
                })
        })
    })
})

describe("Product test", function () {
    
})