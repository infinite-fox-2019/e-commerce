'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const app = require('../app')
const expect = chai.expect

const { Product } = require('../models')

chai.use(chaiHttp)

const product = {
  name: 'Final Fantasy XV',
  price: 50,
  quantity: 56,
  description: 'Final Fantasy XV is an action role-playing game developed and published by Square Enix as part of the long-running Final Fantasy series. It was released for the PlayStation 4 in 2016.'
}

const updateProduct = {
  name: 'Final Fantasy XIV',
  price: 5250000,
  quantity: 50,
  description: 'Final Fantasy XIV is an action role-playing game developed and published by Square Enix as part of the long-running Final Fantasy series. It was released for the PlayStation 4 and Xbox One in 2016'
}

let productId = null
let products = []

// Product CRUD - by Administrator
describe('Product CRUD', function () {
  let token = null

  before('Login as administrator', function (done) {
    // Administrator
    const adminLogin = {
      email: 'admin@gamestop.com',
      password: 'adminadmin'
    }

    chai.request(app)
      .post('/users/login')
      .send(adminLogin)
      .end(function (err, res) {
        if (err) {
          done(err)
        } else {
          token = res.body.token
          done()
        }
      })
  })

  after('Delete dummies', (done) => {
    Product.deleteMany()
      .then((result) => {
        done()
      }).catch((err) => {
        console.log(err)
      })
  })

  // CREATE
  describe('Create New Product', function () {
    it('It should return new product information after successfully created', function (done) {
      this.timeout(10000)
      chai.request(app)
        .post('/products')
        .set('token', token)
        .field('name', 'Final Fantasy XV')
        .field('price', 50)
        .field('quantity', 56)
        .field('description', 'Final Fantasy XV is an action role-playing game developed and published by Square Enix as part of the long-running Final Fantasy series. It was released for the PlayStation 4 in 2016.')
        .attach('file', fs.readFileSync('./test/destiny2.jpeg'), 'destiny2.jpeg')
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.include.all.keys('name', 'price', 'quantity', 'description')
            expect(res.body.name).to.equal(product.name)
            expect(res.body.price).to.equal(product.price)
            expect(res.body.quantity).to.equal(product.quantity)
            expect(res.body.description).to.equal(product.description)
            productId = res.body._id
            done()
          }
        })
    })
  })

  // READ
  describe('Get All Product Information', function () {
    it('It should return new product information after successfully created', function (done) {
      chai.request(app)
        .get('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            products = res.body
            done()
          }
        })
    })
  })

  // UPDATE
  describe('Update Product Information', function () {
    let productId = null

    before('create test product', function (done) {
      Product.create(product)
        .then(product => {
          productId = String(product.id)
          done()
        })
    })

    it('It should return updated product data', function (done) {
      chai.request(app)
        .patch(`/products/${productId}`)
        .set('token', token)
        .send(updateProduct)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.include.all.keys('message', 'previousUpdatedProduct')
            expect(res.body.message).to.be.equal('Product successfully updated')
            done()
          }
        })
    })
  })

  // DELETE
  describe('Delete a product', function () {
    let productId = null

    before('create test product', function (done) {
      Product.create(product)
        .then(product => {
          productId = String(product.id)
          done()
        })
    })

    it('It should return deleted product data', function (done) {
      chai.request(app)
        .delete(`/products/${productId}`)
        .set('token', token)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.include.all.keys('message', 'deletedProduct')
            expect(res.body.message).to.be.equal('Product successfully deleted')
            expect(res.body.deletedProduct).to.be.an('object')
            expect(res.body.deletedProduct).to.include.all.keys('name', 'price', 'quantity', 'description')
            expect(res.body.deletedProduct.name).to.be.equal(product.name)
            expect(res.body.deletedProduct.price).to.be.equal(product.price)
            expect(res.body.deletedProduct.quantity).to.be.equal(product.quantity)
            expect(res.body.deletedProduct.description).to.be.equal(product.description)
            done()
          }
        })
    })
  })
})
