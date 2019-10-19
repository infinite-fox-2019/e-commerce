"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
// const fs = require('fs')
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHTTP)

let userToken = null

let productId1 = "5da6965e8e68ae10fa3c6125"
let productId2 = "5da6969e1be6ec129d832c6e"
let productId3 = "5daa76574d936f294d89de91"
let cartAmount = 0

before(function (done) {
    const user = {
        username: "tigor123",
        email: "tigor123@email.com",
        password: "12345"
    }

    function getUsertoken() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end(function (err, res) {
                    if (err) return reject(err)
                    userToken = res.body.token
                    resolve()
                })
        })
    }

    Promise.all([getUsertoken()])
        .then(() => done())
})

after(function (done) {
    Promise.all([Product.deleteMany({}), User.deleteMany({})])
        .then(() => done())
})

describe('Cart Route', function () {
    describe('Get User Cart', function () {
        it('Success Get User Cart', function (done) {
            chai.request('app')
                .get('/cart')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('cart')
                    expect(res.body.cart).to.be.an('array')
                    res.body.cart.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('proudct', 'quantity')
                        expect(el.product).to.have.all.keys('_id', 'productName', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(el.quantity).to.be.a('number')
                        cartAmount++
                    })
                    done()
                })
        })

        it('Fail Get User Cart - Token Not Set', function () {
            chai.request('app')
                .get('/cart')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Token is not set for this request')
                    done()
                })
        })
    })

    describe('Add Product to Cart', function () {
        it('Success Add Product to Cart', function (done) {
            const data = {
                id: productId1,
                quantity: 10
            }

            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    let countCart = 0
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('cart')
                    expect(res.body.cart).to.be.an('array')
                    expect(res.body.cart).to.have.lengthOf.at.least(1)
                    res.body.cart.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('proudct', 'quantity')
                        expect(el.product).to.have.all.keys('_id', 'productName', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(el.quantity).to.be.a('number')
                        countCart++
                    })
                    expect(countCart).to.be.greaterThan(cartAmount)
                    cartAmount = countCart
                    done()
                })
        })
        it('Fail Add Product to Cart - Product Not Found', function (done) {
            const data = {
                id: "5da6965e8e68ae10fa3c6124",
                quantity: 10
            }
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("There's no product with such id")
                    done()
                })
        })
        it('Fail Add Product to Cart - Buy 0 Amount or less', function (done) {
            const data = {
                id: productId1,
                quantity: 0
            }
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot buy a product with 0 or lower amount")
                    done()
                })
        })
        it('Fail Add Product to Cart - Buy above stock amount', function (done) {
            const data = {
                id: productId1,
                quantity: 99999999
            }
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot buy a product higher than the stock have")
                    done()
                })
        })
        it('Fail Add Product to Cart - Adding a product with 0 stock', function (done) {
            const data = {
                id: productId3,
                quantity: 1
            }
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot add a product with empty stock")
                    done()
                })
        })
        it('Fail Add Product to Cart - Token Not Set', function (done) {
            const data = {
                id: productId1,
                quantity: 1
            }
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token not set for this request")
                    done()
                })
        })
    })

    describe('Remove item from cart', function () {
        it('Success remove item from cart', function (done) {
            chai.request(app)
                .patch('/cart/' + productId1)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    let countCart = 0
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('cart')
                    expect(res.body.cart).to.be.an('array')
                    res.body.cart.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('proudct', 'quantity')
                        expect(el.product).to.have.all.keys('_id', 'productName', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(el.quantity).to.be.a('number')
                        countCart++
                    })
                    expect(countCart).to.be.lessThan(cartAmount)
                    cartAmount = countCart
                    done()
                })

        })

        it('Fail Add Product to Cart - Product Not Found', function (done) {
            chai.request(app)
                .patch('/cart/' + productId1)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("There's no product with such id in your cart")
                    done()
                })
        })
        it('Fail Add Product to Cart - Token Not Set', function (done) {
            chai.request(app)
                .patch('/cart/' + productId1)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token not set for this request")
                    done()
                })
        })
    })

    describe('Update cart', function () {
        it('Success update cart', function (done) {
            const data = [
                {
                    product: productId1,
                    quantity: 2000
                },
                {
                    product: productId2,
                    quantity: 3000
                }
            ]
            chai.request(app)
                .put('/cart')
                .set({ Authorization: userToken })
                .send({ data })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('cart')
                    expect(res.body.cart).to.be.an('array')
                    expect(res.body.cart).to.have.lengthOf(2)
                    res.body.cart.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('proudct', 'quantity')
                        expect(el.product).to.have.all.keys('_id', 'productName', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(el.quantity).to.be.a('number')
                    })
                    cartAmount = res.body.cart.length
                    done()
                })
        })

        it('Fail update cart - No data property', function (done) {
            chai.request(app)
                .set({ Authorization: userToken })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Request body must have a property named 'data'")
                    done()
                })
        })

        it('Fail update cart - wrong data type', function (done) {
            const data = {}
            chai.request(app)
                .set({ Authorization: userToken })
                .send({ data })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Wrong data type - data must be an array")
                    done()
                })
        })



        it('Fail Update Cart - Token Not Set', function (done) {
            const data = [
                {
                    product: productId1,
                    quantity: 2000
                },
                {
                    product: productId2,
                    quantity: 3000
                }
            ]
            chai.request(app)
                .put('/cart/')
                .send({ data })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token not set for this request")
                    done()
                })
        })

        it('Fail Update Cart - Validation Error', function (done) {
            chai.request(app)
                .put('/cart')
                .set({ Authorization: userToken })
                .send([])
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.an('array')
                    message.forEach(el => {
                        expect(el).to.be.a('string')
                    })
                    done()
                })
        })
        it('Fail Update Cart - Product Not Found', function (done) {
            const data = [{
                id: "5da6965e8e68ae10fa3c6124",
                quantity: 10
            }]
            chai.request(app)
                .post('/cart')
                .send({ data })
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("There's no product with such id")
                    done()
                })
        })

        it('Fail Update Cart - Buy 0 Amount or less', function (done) {
            const data = [{
                id: productId1,
                quantity: 0
            }]
            chai.request(app)
                .put('/cart')
                .send({ data })
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot buy a product with 0 or lower amount")
                    done()
                })
        })
        it('Fail update Cart - Buy above stock amount', function (done) {
            const data = [{
                id: productId1,
                quantity: 99999999
            }]
            chai.request(app)
                .put('/cart')
                .send({ data })
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot buy a product higher than the stock have")
                    done()
                })
        })
        it('Fail update Cart - Adding a product with 0 stock', function (done) {
            const data = {
                id: productId3,
                quantity: 1
            }
            chai.request(app)
                .put('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You cannot add a product with empty stock")
                    done()
                })
        })
    })

    describe('Delete Cart', function () {
        it('Success delete cart', function (done) {
            chai.request(app)
                .delete('/cart')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    const { message } = res.body
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Cart deleted")
                    done()
                })
        })
        it('Fail delete cart - No Token Set', function (done) {
            chai.request(app)
                .delete('/cart')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('code')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Cart deleted")
                    done()
                })
        })
    })
})