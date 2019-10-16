const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')

chai.use(chaiHttp)

describe('Product Testing', function () {
  let productId = ''
  const newProduct = {
    name: 'Dota 2',
    desc: 'Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it\'s their 10th hour of play or 1,000th, there\'s always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on',
    stock: 50,
    price: 2000000,
    img_url: 'https://static-cdn.jtvnw.net/ttv-boxart/Dota%202.jpg'
  }
  after(function() {
    // runs after all tests in this block
    return Product.deleteMany({})
  });
  describe('POST /products', function () {
    it('should return _id, name, desc, stock, price, img_url', function (done) {   
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.all.keys('_id', 'name', 'desc', 'stock', 'price', 'img_url')
          expect(res).to.have.status(201)
          done()
        })
    })
  })
  describe('check new product on products collection', function () {
    it('should return new product', function (done) {
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