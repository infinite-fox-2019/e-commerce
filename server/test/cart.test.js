const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/cart')
const {decodeToken} = require('../helpers/jwt')

chai.use(chaiHttp)

describe('Cart Testing', function () {
  let token
  let product
  let loggedUser
  before(function (done) {
    chai
      .request(app)
      .post('/register')
      .send({
        name: 'Ahmad Fadilah',
        role: 'costumer',
        email: 'fadil@mail.com',
        password: 'fadil'
      })
      .end(function (err, res) {
      })
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'fadil@mail.com',
        password: 'fadil'
      })
      .end(function (err, res) {
        token = res.body.token
        loggedUser = decodeToken(token)
      })
    chai
      .request(app)
      .post('/products/add')
      .send({
        name: 'TV',
        price: 2000000
      })
      .end(function (err, res) {
        product = res.body
        done()
      })
  })
  after(function (done) {
    Cart
      .deleteMany({})
      .then(() => done())
      .catch(() => done())
  })
  describe('POST /carts/add', function () {
    it('should return userid, productid', function (done) {
      let body = {
        UserId: loggedUser.id,
        ProductId: product._id
      }
      chai
        .request(app)
        .post('/carts/add')
        .set({'token': token})
        .send(body)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.all.keys('_id', 'UserId', 'ProductId')
          done()
        })
    })
  })
})