const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const seedDatabase = require("../helpers/test/seedDatabase")

chai.use(chaiHttp);

let tokenGhozi = "";
let tokenRizky = "";
let idProduct = ""

before(function (done) {
    seedDatabase(done)
})

describe("Product Test", function () {
    this.timeout(10000)
    before(function (done) {
        let Rizky = {
            email: 'rizky@gmail.com',
            password: "12345"
        }
        chai
            .request(app)
            .post("/user/login")
            .send(Rizky)
            .end(function (err, res) {
                tokenRizky = res.body.token
                done();
            })
    })
    before(function (done) {
        let Ghozi = {
            email: "ghozi@gmail.com",
            password: "12345",
        };

        chai
            .request(app)
            .post("/user/login")
            .send(Ghozi)
            .end(function (err, res) {
                tokenGhozi = res.body.token
                done();
            })
    })

    describe("GET /products", function () {
        it("Succesfully get all products", function (done) {
            chai
                .request(app)
                .get("/products")
                .set("token", tokenGhozi)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array")
                    expect(res.body.length).to.equal(7)
                    res.body.forEach(element => {
                        expect(element).to.have.keys(["_id", "name", "image", "price", "stock", "brand", "createdAt", "updatedAt"])
                    });
                    done();
                })
        })
    })
    describe("POST /products", function () {
        it("Succesfully post product with status 201", function (done) {
            let product = {
                name: "ASUS Zenfone 3",
                price: 200,
                stock: 10,
                image: "ini foto ASUS Zenfone 3",
                brand: 'ASUS'
            }
            chai
                .request(app)
                .post("/products")
                .set("token", tokenGhozi)
                .send(product)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys(['_id', 'name', "price", "stock", "image", "brand", "createdAt", "updatedAt"]);
                    expect(res.body.name).to.equal(product.name)
                    expect(res.body.image).to.equal(product.image)
                    expect(res.body.price).to.equal(product.price)
                    idProduct = res.body._id
                    done();
                })
        })
        it("Error while add new product: User is not admin  (status:403) ", function (done) {
            let product = {
                name: "Samsung A50s",
                image: "ini foto Samsung A50s",
                stock: 13,
                price: 280
            }
            chai
                .request(app)
                .post("/products")
                .set("token", tokenRizky)
                .send(product)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal(`you don't have the authority to do this action`)
                    done();
                })
        })
        it("Error while add new product: with empty body (status:400) ", function (done) {
            let product = {}
            chai
                .request(app)
                .post("/products")
                .set("token", tokenGhozi)
                .send(product)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('your product needs name. your product needs image. your product needs price. your product needs stock. your product needs brand')
                    done()
                })
        })
        it("Error while add new product: with empty price  (status:400) ", function (done) {
            let player = {
                name: "iPhone X",
                image: "ini foto iPhone X",
                stock: 8,
                brand: 'Apple'
            }
            chai
                .request(app)
                .post("/products")
                .set("token", tokenGhozi)
                .send(player)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal('your product needs price')
                    done()
                })
        })
    })
    describe("PUT /products", function () {
        it("Succesfully update product", function (done) {
            let updateData = {
                name: 'ASUS Zenfone 3s',
                price: 250
            }
            chai
                .request(app)
                .put(`/products/${idProduct}`)
                .set("token", tokenGhozi)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys(['_id', 'name', "image", "price", "stock", "brand", "createdAt", "updatedAt"]);
                    expect(res.body.name).to.equal(updateData.name)
                    expect(res.body.price).to.equal(updateData.price)
                    done()
                })
        })

        it("Error while updating data with user not admin (status: 403)", function (done) {
            let updateData = {
                name: 'ASUS Zenfone 3s',
                price: 250
            }
            chai
                .request(app)
                .put(`/products/${idProduct}`)
                .set("token", tokenRizky)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys("message");
                    expect(res.body.message).to.equal(`you don't have the authority to do this action`)
                    done()
                })
        })

    })
    describe("PATCH /products", function () {
        it("Succesfully update stock", function (done) {
            let updateData = {
                stock: 20
            }
            chai
                .request(app)
                .patch(`/products/stock/${idProduct}`)
                .set("token", tokenGhozi)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys(['_id', 'name', "image", "price", "stock", "brand", "createdAt", "updatedAt"]);
                    expect(res.body.stock).to.equal(updateData.stock)
                    done()
                })
        })
        it("Error while updating data with user not admin (status: 403)", function (done) {
            let updateData = {
                stock: 20
            }
            chai
                .request(app)
                .patch(`/products/stock/${idProduct}`)
                .set("token", tokenRizky)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal(`you don't have the authority to do this action`)
                    done()
                })
        })
        it("Succesfully update image", function (done) {
            let updateData = {
                image: `http:link image Zenfone`
            }
            chai
                .request(app)
                .patch(`/products/image/${idProduct}`)
                .set("token", tokenGhozi)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys(['_id', 'name', "image", "price", "stock", "brand", "createdAt", "updatedAt"]);
                    expect(res.body.image).to.equal(updateData.image)
                    done()
                })
        })
        it("Error while updating data with user not admin (status: 403)", function (done) {
            let updateData = {
                image: `http:link image Zenfone`
            }
            chai
                .request(app)
                .patch(`/products/image/${idProduct}`)
                .set("token", tokenRizky)
                .send(updateData)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal(`you don't have the authority to do this action`)
                    done()
                })
        })
    })
    describe("DELETE /products", function () {
        it("Error while deleting product with user not admin (status: 403)", function (done) {
            chai
                .request(app)
                .delete(`/products/${idProduct}`)
                .set("token", tokenRizky)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.all.keys('message');
                    expect(res.body.message).to.equal(`you don't have the authority to do this action`)
                    done()
                })
        })
        it("Successfully delete product", function (done) {
            chai
                .request(app)
                .delete(`/products/${idProduct}`)
                .set("token", tokenGhozi)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object")
                    expect(res.body).to.have.keys(['_id', 'name', "image", "price", "stock", "brand", "createdAt", "updatedAt"]);
                    done()
                })
        })

    })

})