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
    // const productSeed = JSON.parse(fs.readFileSync('./test/seed/products.json'))

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
                .get('/carts')
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
                .get('/carts')
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

    describe('Success Add Product to Cart', function () {
        it('Success Add Product to Cart', function (done) {
            const data = {
                id: productId1,
                quantity: 10
            }

            chai.request(app)
                .post('/carts')
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
                .post('/carts')
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
                .post('/carts')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(406)
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
                .post('/carts')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(406)
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
                id: productId1,
                quantity: 1
            }
            chai.request(app)
                .post('/carts')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(406)
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
                .post('/carts')
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
                .patch('/carts/' + productId1)
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
                .patch('/carts/' + productId1)
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
                .patch('/carts/' + productId1)
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
})