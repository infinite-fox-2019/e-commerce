const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')

chai.use(chaiHttp)

describe('Product Testing', function () {
  let productId = ''
  after(function() {
    // runs after all tests in this block
    return Product.deleteMany({})
  });
  describe('POST /products/add', function () {
    it('should return name, price', function (done) {
      const newProduct = {
        name: 'TV',
        price: 2000000
      }
      chai
        .request(app)
        .post('/products/add')
        .send(newProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.all.keys('_id', 'name', 'price')
          expect(res).to.have.status(201)
          done()
        })
    })
  })
  describe('check new product on products collection', function () {
    it('should return new product', function (done) {
      const newProduct = {
        name: 'TV',
        price: 2000000
      }
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          productId = res.body[res.body.length-1]._id
          expect(err).to.be.null
          expect(res.body).to.be.an('array')
          expect(res.body[res.body.length-1].name).to.equal(newProduct.name)
          expect(res).to.have.status(200)
          done()
        })
    })
  })
  describe('DELETE /products/:id', function () {
    it('should delete product id', function (done) {
      chai
        .request(app)
        .delete('/products/'+productId)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body.deletedCount).to.equal(res.body.ok)
          done()
        })
    })
  })
})