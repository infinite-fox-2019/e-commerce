"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')
const gcsdelete = require('../helpers/gcsdelete')
const Product = require('../models/product')
const User = require('../models/user')

let image = fs.readFileSync('./test/seed/assets/mi-kit.png')
let adminToken = null


chai.use(chaiHTTP)

before(function (done) {
    const data = {
        username: "adminTigor",
        email: "adminTigor@email.com",
        password: "12345",
        SECRET_KEY: process.env.SECRET_KEY
    }

    chai.request(app)
        .post('/users/register/admin')
        .send(data)
        .end(function (err, res) {
            adminToken = res.body.token
            done()
        })
})

after(function (done) {
    // return Product.deleteMany({})
    Promise.all([Product.deleteMany({}), User.deleteMany({})])
        .then(() => done())
})

describe('Product Route', function () {
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
            this.timeout(10000)
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
                    done()
                })
        })
    })
})