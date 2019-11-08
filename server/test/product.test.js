"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const fs = require('fs')
const app = require('../app')
const gcsdelete = require('../helpers/gcsdelete')
const Product = require('../models/product')
const User = require('../models/user')

let adminToken = null
let nonAdminToken = null
let productId

const image = fs.readFileSync('./test/seed/assets/mi-kit.png')

chai.use(chaiHTTP)

describe('Product Route', function () {
    before(function (done) {
        this.timeout(30000)
        const adminData = {
            username: "adminTigor",
            email: "adminTigor@email.com",
            password: "12345",
            SECRET_KEY: process.env.SECRET_KEY
        }
        const nonAdminData = {
            username: "nonAdmin",
            email: "nonAdmin@email.com",
            password: "12345"
        }

        const tokens = () => {
            return new Promise((resolve, reject) => {
                chai.request(app)
                    .post('/users/register/admin')
                    .send(adminData)
                    .end(function (err, res) {
                        if (err) return reject(err)
                        adminToken = res.body.token
                        chai.request(app)
                            .post('/users/register')
                            .send(nonAdminData)
                            .end(function (err, res) {
                                if (err) return reject(err)
                                nonAdminToken = res.body.token
                                resolve()
                            })
                    })
            })
        }

        Promise.all([tokens()])
            .then(() => done())
            .catch(err => {
                console.error(err)
                return Promise.all([Product.deleteMany({}), User.deleteMany({})])
            })
            .then(() => done())
            .catch(console.error)
    })

    after(function (done) {
        this.timeout(60000)
        Promise.all([Product.deleteMany({}), User.deleteMany({})])
            .then(() => done())
            .catch(console.error)
    })


    let imageurl = null
    afterEach(function () {
        if (imageurl) {
            gcsdelete(imageurl)
            imageurl = null
        }
        return
    })
    describe('Create Product', function () {
        it('Success Create Product', function (done) {
            this.timeout(30000)
            const data = {
                name: "Mi Home Kit",
                price: 4500000,
                stock: 30,
            }
            chai.request(app)
                .post('/products')
                .type('form')
                .set({ authorization: adminToken })
                .field('name', 'Mi Home Kit')
                .field('price', '4500000')
                .field('stock', '30')
                .attach('image', image, 'mi-kit.png')
                .end(function (err, res) {
                    productId = res.body._id
                    imageurl = res.body.image
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'price', 'stock', 'image', 'createdAt', 'updatedAt', '_id')
                    const { name, price, stock, image } = res.body
                    expect(name).to.equal(data.name)
                    expect(price).to.equal(data.price)
                    expect(stock).to.equal(data.stock)
                    expect(image).to.include('https://storage.googleapis.com/')
                    done()
                })
        })

        it('Fail create Product - Not Admin', function (done) {
            this.timeout(30000)
            chai.request(app)
                .post('/products')
                .field('name', 'Mi Home Kit')
                .field('price', 4500000)
                .field('stock', 30)
                .attach('image', image, 'mi-kit.png')
                .set({ authorization: nonAdminToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Only administrator may access this resource')
                    done()
                })
        })
        it('Fail create Product - Token Not Set', function (done) {
            this.timeout(30000)
            chai.request(app)
                .post('/products')
                .field('name', 'Mi Home Kit')
                .field('price', 4500000)
                .field('stock', 30)
                .attach('image', image, 'mi-kit.png')
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

    describe('GET Product', function () {
        it('Success Get Product', function (done) {
            chai.request(app)
                .get('/products')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    res.body.forEach(el => {
                        expect(el).to.be.an('object')
                        expect(el).to.have.property('name')
                        expect(el).to.have.property('stock')
                        expect(el).to.have.property('image')
                        expect(el).to.have.property('price')
                        const { image } = el
                        expect(image).to.match(/https?:\/\//)
                    })
                    done()
                })
        })
    })

    describe('Update product', function () {
        it('Success update product', function (done) {
            this.timeout(30000)
            chai.request(app)
                .put('/products/' + productId)
                .set({ Authorization: adminToken })
                .field('name', 'Mi Home Kit - Edit')
                .field('price', 5000000)
                .field('stock', 25)
                .attach('image', image, 'mi-kit.png')
                .end(function (err, res) {
                    imageurl = res.body.image
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'price', 'stock', 'image', 'createdAt', 'updatedAt', '_id')
                    const { name, price, stock, image } = res.body
                    expect(name).to.equal('Mi Home Kit - Edit')
                    expect(price).to.equal(5000000)
                    expect(stock).to.equal(25)
                    expect(image).to.include('https://storage.googleapis.com/')
                    done()
                })
        })

        it('Fail Update Product - Not Admin', function (done) {
            chai.request(app)
                .put('/products/' + productId)
                .field('name', 'Mi Home Kit')
                .field('price', 4500000)
                .field('stock', 30)
                .attach('image', image, 'mi-kit.png')
                .set({ authorization: nonAdminToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Only administrator may access this resource')
                    done()
                })
        })

        it('Fail Update Product - Token Not Set', function (done) {
            chai.request(app)
                .put('/products/' + productId)
                .field('name', 'Mi Home Kit')
                .field('price', 4500000)
                .field('stock', 30)
                .attach('image', image, 'mi-kit.png')
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

    describe('Delete product', function () {
        it('Success Delete Product', function (done) {
            this.timeout(30000)
            chai.request(app)
                .delete('/products/' + productId)
                .set({ authorization: adminToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    const { message } = res.body
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Product deleted')
                    done()
                })
        })
        it('Fail Delete Product - Not Admin', function (done) {
            chai.request(app)
                .delete('/products/' + productId)
                .set({ authorization: nonAdminToken })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.be.a('number')
                    expect(code).to.equal(403)
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Only administrator may access this resource')
                    done()
                })
        })
        it('Fail Delete Product - Token Not Set', function (done) {
            chai.request(app)
                .delete('/products/' + productId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.be.a('number')
                    expect(code).to.equal(res.status)
                    expect(message).to.be.a('string')
                    expect(message).to.equal('Token is not set for this request')
                    done()
                })
        })
    })
})