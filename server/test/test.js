const chai = require("chai")
const expect = chai.expect
const app = require("../app")
chaiHttp = require('chai-http')
chai.use(chaiHttp)
const User = require("../models/user")
let token
let id
let productId
let role
let dummyProductId ="5dac42a42414a12e84476528"


//UNCOMMENT REGISTER TO START TESTING FROM REGIST PROCESS

describe("Admin Testing", function(){
    // after(function(done){
    //     this.timeout(3000)
    //     User.deleteMany(function(){
    //         done()
    //     })
    // })

    //     describe("/register", function(){
    //     it("should return email, hashpassword, objectId", function(done){
    //         let body = {
    //             email : "admin@email.com",
    //             password : "admins",
    //         }

    //         chai.request(app)
    //         .post("/register")
    //         .send(body)
    //         .end(function(err,res){
    //             expect(err).to.be.null
    //             expect(res.body).to.be.an("object")
    //             expect(res).to.have.status(201)
    //             expect(res.body).to.have.property("password")
    //             expect(res.body).to.have.property("email")
    //             expect(res.body).to.have.all.keys("email","password","_id","role","listProducts")
    //             done()
    //         })

    //     })
    // })

    describe("/login", function(){
        it("should return token", function(done){
            let body = {
                email : "admin@email.com",
                password : "admins"
            }

            chai.request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.all.keys("token")
                token = res.body.token
                done()
            })

        })
    })

    describe("/admins", function(){
        it("should return list of admin products", function(done){
            let headers = {
                token : token
            }

            chai.request(app)
            .get("/admins")
            .set(headers)
            .end(function(err,res,req){
                role = res.body.role
                expect(err).to.be.null
                expect(res.body.role).to.equal("admins")
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("email","password","_id","role","listProducts")
                done()
            })

        })

        it("should let admins to add their products", function(done){
            let body = {
                name : "barang test",
                description : "test description",
                price : "123"
            }

            let headers = {
                token : token
            }

            chai.request(app)
            .post("/admins")
            .send(body)
            .set(headers)
            .end(function(err,res,req){
                productId = res.body.listProducts[res.body.listProducts.length - 1]
                expect(err).to.be.null
                expect(res.body.role).to.equal("admins")
                expect(res.body.name).not.to.be.null
                expect(res.body.price).not.to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("email","password","_id","role","listProducts")
                done()
            })

        })

        it("should let admins to update their products", function(done){
            let body = {
                name : "barang test ke update 2",
                description : "test ke update 2",
                price : "321"
            }

            let headers = {
                token : token
            }

            chai.request(app)
            .patch(`/admins/${productId}`)
            .send(body)
            .set(headers)
            .end(function(err,res,req){
                expect(err).to.be.null
                expect(role).to.equal("admins")
                expect(res.body.name).not.to.be.null
                expect(res.body.price).not.to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("name","description","_id","price", "image", "stock")
                done()
            })

        })

        it("should let admins to remove their products", function(done){

            let headers = {
                token : token
            }

            chai.request(app)
            .delete(`/admins/${productId}`)
            .set(headers)
            .end(function(err,res,req){
                expect(err).to.be.null
                expect(role).to.equal("admins")
                expect(res.body.name).not.to.be.null
                expect(res.body.price).not.to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("name","description","_id","price", "image", "stock")
                done()
            })

        })
    })
})

describe("User Testing", function(){
    // after(function(done){
    //     this.timeout(3000)
    //     User.deleteMany(function(){
    //         done()
    //     })
    // })

    // describe("/register", function(){
    //     it("should return email, hashpassword, objectId", function(done){
    //         let body = {
    //             email : "rehun@email.com",
    //             password : "bebass"
    //         }

    //         chai.request(app)
    //         .post("/register")
    //         .send(body)
    //         .end(function(err,res){
    //             expect(err).to.be.null
    //             expect(res.body).to.be.an("object")
    //             expect(res).to.have.status(201)
    //             expect(res.body).to.have.property("password")
    //             expect(res.body).to.have.property("email")
    //             expect(res.body).to.have.all.keys("email","password","_id","role")
    //             done()
    //         })

    //     })
    // })

    describe("/login", function(){
        it("should return token", function(done){
            let body = {
                email : "rehun@email.com",
                password : "bebass"
            }

            chai.request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.all.keys("token")
                token = res.body.token
                done()
            })

        })

        describe("/users", function(){
            it("should return list products and its payload", function(done){
                let headers = {
                    token : token
                }
    
                chai.request(app)
                .get("/users")
                .set(headers)
                .end(function(err,res,req){
                    let id = res.body.payload.id
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("object")
                    done()
                })
    
            })

            it("should create cart based on users id", function(done){
                let headers = {
                    token : token
                }
    
                chai.request(app)
                .post("/users")
                .set(headers)
                .end(function(err,res,req){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.all.keys("_id", "UserId","ProductsId", "price", "quantity")
                    done()
                })
    
            })
        })
    })


})


//CART TESTING HERE, BEFORE IT DELETED
describe('carts testing', function(){
    it("should add product to cart", function(done){
        let headers = {
            token : token
        }

        chai.request(app)
        .patch(`/carts/${dummyProductId}`)
        .set(headers)
        .end(function(err,res,req){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.all.keys("_id", "UserId","ProductsId", "price", "quantity")
            done()
        })

    })
    it("should show list products in cart", function(done){
        let headers = {
            token : token
        }

        chai.request(app)
        .get("/carts")
        .set(headers)
        .end(function(err,res,req){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            done()
        })

    })
            
    it("should remove product from cart", function(done){
        let headers = {
            token : token
        }

        chai.request(app)
        .delete(`/carts/${dummyProductId}`)
        .set(headers)
        .end(function(err,res,req){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.all.keys("_id", "UserId","ProductsId", "price", "quantity")
            done()
        })

    })
    it("should remove cart based on users id", function(done){
        let headers = {
            token : token
        }
        chai.request(app)
        .delete(`/users`)
        .set(headers)
        .end(function(err,res,req){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.all.keys("_id", "UserId","ProductsId", "price", "quantity")
            done()
        })
    })
})




