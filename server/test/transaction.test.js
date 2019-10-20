"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const fs = require('fs')
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')
const gcsdelete = require('../helpers/gcsdelete')

chai.use(chaiHTTP)

let userToken
let userToken2
let adminToken

let productId
const image = fs.readFileSync('./test/seed/assets/350x150.png')
let image1
let transactionId

before(function (done) {
    this.timeout(60000)
    const customerData = {
        username: "tgr",
        email: "tgr@email.com",
        password: "12345"
    }
    const customerData2 = {
        username: "tgr1",
        email: "tgr1@email.com",
        password: "12345"
    }
    const adminData = {
        username: "adminTigor3",
        email: "adminTigor3@email.com",
        password: "12345"
    }

    function createAdmin() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register/admin')
                .send(adminData)
                .end(function (err, res) {
                    if (err) return reject(err)
                    adminToken = res.body.token
                    resolve()
                })
        })
    }

    function getUsertoken() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send(customerData)
                .end(function (err, res) {
                    if (err) return reject(err)
                    userToken = res.body.token
                    resolve()
                })
        })
    }
    function getUsertoken2() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send(customerData2)
                .end(function (err, res) {
                    if (err) return reject(err)
                    userToken2 = res.body.token
                    resolve()
                })
        })
    }

    function getProduct() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/products')
                .type('form')
                .set({ authorization: adminToken })
                .field('name', 'Mi Home Kit')
                .field('price', '4500000')
                .field('stock', '30')
                .attach('image', image, 'placeholder.png')
                .end(function (err, res) {
                    if (err) return reject(err)
                    productId = res.body._id
                    image1 = res.body.image
                    resolve()
                })
        })
    }

    function addProductToCart() {
        const data = {
            id: productId,
            quantity: 10
        }
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/cart')
                .send(data)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    if (err) return reject(err)
                    resolve()
                })
        })
    }

    Promise.all([createAdmin(), getUsertoken(), getUsertoken2(), getProduct()])
        .then(() => addProductToCart())
        .then(() => done())
        .catch((console.error))
})

after(function (done) {
    Promise.all([gcsdelete(image1), Product.deleteMany({}), User.deleteMany({})])
        .then(() => done())
        .catch((console.error))
})

describe.only('Transaction Route', function () {
    describe('Create Transaction', function () {
        it('Success Create Transaction', function (done) {
            chai.request(app)
                .get('/transactions/create')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    transactionId = res.body._id
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id', 'owner', 'products', 'status', 'createdAt', 'updatedAt')
                    const { products, status, createdAt, updatedAt } = res.body
                    expect(products).to.be.an('array')
                    products.forEach(el => {
                        expect(el).to.have.all.keys('products', 'quantity')
                        expect(el.product).to.have.all.keys('_id', 'name', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(el.quantity).to.be.a('number')
                    })
                    expect(status).to.be.a('string')
                    expect(status).to.equal("pending")
                    expect(createdAt).to.be.a('date')
                    expect(updatedAt).to.be.a('date')
                    done()
                })
        })

        it('Fail create transaction - Empty Cart', function (done) {
            chai.request(app)
                .get('/transactions/add')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Cannot create transaction with empty cart")
                    done()
                })
        })

        it('Fail create transaction - Token Not Set', function (done) {
            chai.request(app)
                .get('/transactions/add')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
    })

    describe('Get Transaction', function () {
        it('Success Get Transactions', function (done) {
            chai.request(app)
                .get('/transactions')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    res.body.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('_id', 'owner', 'products', 'status', 'createdAt', 'updatedAt')
                        const { products, status, createdAt, updatedAt } = el
                        expect(products).to.be.an('array')
                        products.forEach(item => {
                            expect(item).to.have.all.keys('products', 'quantity')
                            expect(item.product).to.have.all.keys('_id', 'name', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                            expect(item.quantity).to.be.a('number')
                        })
                        expect(status).to.be.a('string')
                        expect(createdAt).to.be.a('date')
                        expect(updatedAt).to.be.a('date')
                    })
                    done()
                })
        })
        it('Fail Get Transactions - Token Not Set', function (done) {
            chai.request(app)
                .get('/transactions/')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
    })
    describe('Get Transactions With Pending Status', function () {
        it('Success Get Transactions With Pending Status', function (done) {
            chai.request(app)
                .get('/transactions/pending')
                .set({ Authorization: adminToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    res.body.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('_id', 'owner', 'products', 'status', 'createdAt', 'updatedAt')
                        const { products, status, createdAt, updatedAt } = el
                        expect(products).to.be.an('array')
                        products.forEach(item => {
                            expect(item).to.have.all.keys('products', 'quantity')
                            expect(item.product).to.have.all.keys('_id', 'name', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                            expect(item.quantity).to.be.a('number')
                        })
                        expect(status).to.be.a('string')
                        expect(status).to.equal("pending")
                        expect(createdAt).to.be.a('date')
                        expect(updatedAt).to.be.a('date')
                    })
                    done()
                })
        })
        it('Fail Get Transactions With Pending Status - Token Not Set', function (done) {
            chai.request(app)
                .get('/transactions/pending')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
        it('Fail Get Transactions With Pending Status - Not Admin', function (done) {
            chai.request(app)
                .get('/transactions/pending')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Only an admin can access this request")
                    done()
                })
        })
    })
    describe('Get Transaction With Approval Status', function () {
        it('Success Get Transactions With Approval Status', function (done) {
            chai.request(app)
                .get('/transactions/approval')
                .set({ Authorization: adminToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    res.body.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.all.keys('_id', 'owner', 'products', 'status', 'createdAt', 'updatedAt')
                        const { products, status, createdAt, updatedAt } = el
                        expect(products).to.be.an('array')
                        products.forEach(item => {
                            expect(item).to.have.all.keys('products', 'quantity')
                            expect(item.product).to.have.all.keys('_id', 'name', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                            expect(item.quantity).to.be.a('number')
                        })
                        expect(status).to.be.a('string')
                        expect(status).to.equal("approved")
                        expect(createdAt).to.be.a('date')
                        expect(updatedAt).to.be.a('date')
                    })
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Token Not Set', function (done) {
            chai.request(app)
                .get('/transactions/approval')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Not Admin', function (done) {
            chai.request(app)
                .get('/transactions/approval')
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Only an admin can access this request")
                    done()
                })
        })
    })

    describe('Get single transaction', function (done) {
        it('Success Get single transaction', function (done) {
            chai.request(app)
                .get('/transactions/' + transactionId)
                .set({ Authorization: userToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id', 'owner', 'products', 'status', 'createdAt', 'updatedAt')
                    const { products, status, createdAt, updatedAt } = res.body
                    expect(products).to.be.an('array')
                    products.forEach(item => {
                        expect(item).to.have.all.keys('products', 'quantity')
                        expect(item.product).to.have.all.keys('_id', 'name', 'image', 'price', 'stock', 'createdAt', 'updatedAt')
                        expect(item.quantity).to.be.a('number')
                    })
                    expect(status).to.be.a('string')
                    expect(createdAt).to.be.a('date')
                    expect(updatedAt).to.be.a('date')
                    done()
                })
        })


        it('Fail Get single transaction - Token Not Set', function (done) {
            chai.request(app)
                .get('/transactions/' + transactionId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })

        it('Fail Get single transaction - Forbidden', function (done) {
            chai.request(app)
                .get('/transactions/' + transactionId)
                .set({ Authorization: userToken2 })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("You are not the owner of this transaction")
                    done()
                })
        })
    })

    describe('Set Transaction Status to Approved', function () {
        it('Success Transaction Status to Approved', function (done) {
            chai.request(app)
                .patch('/transactions/approved/' + transactionId)
                .set({ Authorization: adminToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.a('string')
                    expect(res.body.message).to.equal('transaction set to approved')
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Token Not Set', function (done) {
            chai.request(app)
                .patch('/transactions/approved/' + transactionId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Not Admin', function (done) {
            chai.request(app)
                .patch('/transactions/approved/' + transactionId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Only an admin can access this request")
                    done()
                })
        })
    })

    describe('Set Transaction Status to Approved', function () {
        it('Success Transaction Status to Approved', function (done) {
            chai.request(app)
                .patch('/transactions/delivered/' + transactionId)
                .set({ Authorization: adminToken })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.a('string')
                    expect(res.body.message).to.equal('transaction set to approved')
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Token Not Set', function (done) {
            chai.request(app)
                .patch('/transactions/delivered/' + transactionId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Token is not set for this request")
                    done()
                })
        })
        it('Fail Get Transactions With Approval Status - Not Owner', function (done) {
            chai.request(app)
                .patch('/transactions/delivered/' + transactionId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal("Only an admin can access this request")
                    done()
                })
        })
    })
})