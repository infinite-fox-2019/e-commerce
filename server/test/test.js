const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

describe('User Testing', function() {
  let access_token = ''
  let access_token_customer = ''
  let customerId = ''
  let productId = ''
  let cartId = ''
  after(function (done) {
    User.deleteMany({})
    .then(_ => {
      done()
    })
  })
  after(function (done) {
    Product.deleteMany({})
    .then(_ => {
      done()
    })
  })
  after(function (done) {
    Cart.deleteMany({})
    .then(_ => {
      done()
    })
  })
  describe('register', function() {
    it('should return id, username, email, hashed_password and access_token (admin)', function(done) {
      let body = {
        username: 'stephenstrange',
        email: 'stephen@strange.com',
        password: 'strange221',
        admin_password: 'infinitystone'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('id', 'username', 'role', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.role).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        access_token = res.body.access_token

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.role).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
        expect(res.body.role).to.exist
        expect(res.body.access_token).to.exist

        expect(res.password).to.be.not.equal(body.password)
        expect(res.body.role).to.be.equal('admin')
        done()
      })
    })
    it('should return id, username, email, hashed_password and access_token (customer)', function(done) {
      let body = {
        username: 'peterparker',
        email: 'peter@parker.com',
        password: 'amazing21'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('id', 'username', 'role', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.role).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        customerId = res.body.id

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.role).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        access_token_customer = res.body.access_token

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
        expect(res.body.role).to.exist
        expect(res.body.access_token).to.exist

        expect(res.password).to.be.not.equal(body.password)
        expect(res.body.role).to.be.equal('customer')
        done()
      })
    })
    it('should return error message when input is empty string', function(done) {
      let body = {
        username: '',
        email: '',
        password: ''
      }
      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Username cannot be empty')
        expect(res.body.messages).to.include('Email cannot be empty')
        expect(res.body.messages).to.include('Password cannot be empty')
        done()
      })
    })
    it('should return error messages when input length is too short', function(done) {
      let body = {
        username: 'aaaaa',
        email: 'aaa@a.com',
        password: 'aaaaa'
      }
      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Username have to be at least 6 characters')
        expect(res.body.messages).to.include('Password have to be at least 6 characters')
        done()
      })
    })
    it('should return error messages when input format is invalid', function(done) {
      let body = {
        username: 'aaa@aaa',
        email: 'aaa@.com',
        password: 'aaaaaa'
      }
      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Username can only contains alphanumeric')
        expect(res.body.messages).to.include('aaa@.com is not a valid email format')
        expect(res.body.messages).to.include('Password must contain at least 1 letter and 1 number')
        done()
      })
    })
    it('should return an error message when username already registered', function(done) {
      let body = {
        username: 'stephenstrange',
        email: 'stephen@strange.com',
        password: 'strange221',
        admin_password: 'infinitystone'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Username is already registered')
        done()
      })
    })
    it('should return an error message when email already registered', function(done) {
      let body = {
        username: 'doctorstrange',
        email: 'stephen@strange.com',
        password: 'strange221',
        admin_password: 'infinitystone'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Email is already registered')
        done()
      })
    })
    it('should return an error message if admin password is wrong', function(done) {
      let body = {
        username: 'thanos',
        email: 'thanos@infinity.com',
        password: 'gauntlet6',
        admin_password: 'madtitan'
      }

      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Wrong admin password')
        done()
      })
    })
  })
  describe('login', function() {
    it('should return id, username, and access_token', function(done) {
      let body = {
        username: 'stephenstrange',
        password: 'strange221'
      }

      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('id', 'username', 'role', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.role).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.role).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
        expect(res.body.role).to.exist
        expect(res.body.access_token).to.exist

        expect(res.password).to.be.not.equal(body.password)
        done()
      })
    })
    it('should return id, username, and access_token when login using email', function(done) {
      let body = {
        username: 'stephen@strange.com',
        password: 'strange221'
      }

      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('id', 'username', 'role', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.role).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.role).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
        expect(res.body.role).to.exist
        expect(res.body.access_token).to.exist

        expect(res.password).to.be.not.equal(body.password)
        done()
      })
    })
    it('should return error message if username wrong', function(done) {
      let body = {
        username: 'doctorstrange',
        password: 'strange221'
      }

      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')

        expect(res.body.messages).to.include('Wrong username/password')
        done()
      })
    })
    it('should return error message if password wrong', function(done) {
      let body = {
        username: 'stephenstrange',
        password: 'strange222'
      }

      chai.request(app)
      .post('/users/login')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')

        expect(res.body.messages).to.include('Wrong username/password')
        done()
      })
    })
  })
  describe('add product', function() {
    it('should return id, description, price, stock, series, and image', function(done) {
      let body = {
        name: 'SHF Spider-Man Stealth Suit',
        description: 'The new Spider-Man action figure from S.H.Figuarts with the look of Stealth Suit from Spider-Man: Far From Home',
        price: 1300000,
        stock: 8,
        series: 'S.H.Figuarts',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP3hRANixXOeth29UrXuNgVfFRZsTHXCNhcyb4htsft5IS48tB'
      }

      chai.request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'series', 'image')
          expect(res.body._id).to.be.a('string')
          expect(res.body.name).to.be.a('string')
          expect(res.body.description).to.be.a('string')
          expect(res.body.price).to.be.a('number')
          expect(res.body.stock).to.be.a('number')
          expect(res.body.series).to.be.a('string')
          expect(res.body.image).to.be.a('string')

          productId = res.body._id
          expect(res.body._id).to.be.not.empty
          expect(res.body.name).to.be.not.empty
          expect(res.body.description).to.be.not.empty
          expect(res.body.series).to.be.not.empty
          expect(res.body.image).to.be.not.empty

          expect(res.body._id).to.exist
          expect(res.body.name).to.exist
          expect(res.body.description).to.exist
          expect(res.body.price).to.exist
          expect(res.body.stock).to.exist
          expect(res.body.series).to.exist
          expect(res.body.image).to.exist
          done()
        })
    })
    it('should return error message when input is empty string', function(done) {
      let body = {
        name: '',
        description: '',
        price: '',
        stock: '',
        series: '',
        image: 'dummylink'
      }
      chai.request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Name cannot be empty')
        expect(res.body.messages).to.include('Description cannot be empty')
        expect(res.body.messages).to.include('Price cannot be empty')
        expect(res.body.messages).to.include('Stock cannot be empty')
        expect(res.body.messages).to.include('You have to choose a series')
        done()
      })
    })
    it('should return an error message when input is invalid', function(done) {
      let body = {
        name: 'a',
        description: 'a',
        price: 0,
        stock: -1,
        series: 'S.H.Figuarts',
        image: 'dummylink'
      }
      chai.request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Price cannot be zero or less')
        expect(res.body.messages).to.include('Stock cannot be zero or less')
        done()
      })
    })
    describe('get product', function() {
      it('should return array of product objects', function(done) {
        chai.request(app)
          .get('/products')
          .set('access_token', access_token)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'series', 'image')
            expect(res.body[0]._id).to.be.a('string')
            expect(res.body[0].name).to.be.a('string')
            expect(res.body[0].description).to.be.a('string')
            expect(res.body[0].price).to.be.a('number')
            expect(res.body[0].stock).to.be.a('number')
            expect(res.body[0].series).to.be.a('string')
            expect(res.body[0].image).to.be.a('string')
  
            expect(res.body[0].name).to.be.not.empty
            expect(res.body[0].description).to.be.not.empty
            expect(res.body[0].series).to.be.not.empty
            expect(res.body[0].image).to.be.not.empty
  
            expect(res.body[0]._id).to.exist
            expect(res.body[0].name).to.exist
            expect(res.body[0].description).to.exist
            expect(res.body[0].price).to.exist
            expect(res.body[0].stock).to.exist
            expect(res.body[0].series).to.exist
            expect(res.body[0].image).to.exist
            done()
          })
      })
    })
    describe('update product', function() {
      let body = {
        name: 'Edited SHF Spider-Man Stealth Suit',
        description: 'Edited The new Spider-Man action figure from S.H.Figuarts with the look of Stealth Suit from Spider-Man: Far From Home',
        price: 1300001,
        stock: 9,
        series: 'MAFEX',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP3hRANixXOeth29UrXuNgVfFRZsTHXCNhcyb4htsft5IS48tB'
      }
      it('should return updated product', function(done) {
        chai.request(app)
          .put(`/products/${productId}`)
          .set('access_token', access_token)
          .send(body)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(200)
            expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'series', 'image')
            expect(res.body._id).to.be.a('string')
            expect(res.body.name).to.be.a('string')
            expect(res.body.description).to.be.a('string')
            expect(res.body.price).to.be.a('number')
            expect(res.body.stock).to.be.a('number')
            expect(res.body.series).to.be.a('string')
            expect(res.body.image).to.be.a('string')
  
            expect(res.body.name).to.be.not.empty
            expect(res.body.description).to.be.not.empty
            expect(res.body.series).to.be.not.empty
            expect(res.body.image).to.be.not.empty
  
            expect(res.body._id).to.exist
            expect(res.body.name).to.exist
            expect(res.body.description).to.exist
            expect(res.body.price).to.exist
            expect(res.body.stock).to.exist
            expect(res.body.series).to.exist
            expect(res.body.image).to.exist
            done()
          })
      })
      it('should return error message when input is empty string', function(done) {
        let body = {
          name: '',
          description: '',
          price: '',
          stock: '',
          series: '',
          image: 'dummylink'
        }
        chai.request(app)
          .put(`/products/${productId}`)
          .set('access_token', access_token)
          .send(body)
          .end((err, res) => {
          expect(err).to.be.null
          expect(res).status(400)
          expect(res.body.messages).to.include('Name cannot be empty')
          expect(res.body.messages).to.include('Description cannot be empty')
          expect(res.body.messages).to.include('Price cannot be empty')
          expect(res.body.messages).to.include('Stock cannot be empty')
          expect(res.body.messages).to.include('You have to choose a series')
          done()
        })
      })
      it('should return an error message when input is invalid', function(done) {
        let body = {
          name: 'a',
          description: 'a',
          price: 0,
          stock: -1,
          series: 'S.H.Figuarts',
          image: 'dummylink'
        }
        chai.request(app)
          .put(`/products/${productId}`)
          .set('access_token', access_token)
          .send(body)
          .end((err, res) => {
          expect(err).to.be.null
          expect(res).status(400)
          expect(res.body.messages).to.include('Price cannot be zero or less')
          expect(res.body.messages).to.include('Stock cannot be zero or less')
          done()
        })
      })
    })
    describe('add cart', function() {
      it('should return a cart object', function(done) {
        let body = {
          customer: customerId,
          product: productId,
          qty: 3
        }
  
        chai.request(app)
          .post('/carts')
          .set('access_token', access_token)
          .send(body)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'customer', 'product', 'qty')
            expect(res.body._id).to.be.a('string')
            expect(res.body.customer).to.be.a('string')
            expect(res.body.product).to.be.a('string')
            expect(res.body.qty).to.be.a('number')
  
            cartId = res.body._id

            expect(res.body._id).to.be.not.empty
            expect(res.body.customer).to.be.not.empty
            expect(res.body.product).to.be.not.empty
  
            expect(res.body._id).to.exist
            expect(res.body.customer).to.exist
            expect(res.body.product).to.exist
            expect(res.body.qty).to.exist
            done()
          })
      })
      it('should return error messages if input is invalid', function(done) {
        let body = {
          customer: customerId,
          product: productId,
          qty: 100
        }
  
        chai.request(app)
          .post('/carts')
          .set('access_token', access_token)
          .send(body)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(400)
            expect(res.body.messages).to.include('Quantity cannot be more than product stock')
            done()
          })
      })
    })
    describe('delete cart', function() {
      it('should return deleted object', function(done) {
        chai.request(app)
          .delete(`/carts/${cartId}`)
          .set('access_token', access_token_customer)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('_id', 'customer', 'product', 'qty')
            expect(res.body._id).to.be.a('string')
            expect(res.body.customer).to.be.a('string')
            expect(res.body.product).to.be.a('string')
            expect(res.body.qty).to.be.a('number')
  
            expect(res.body._id).to.be.not.empty
            expect(res.body.customer).to.be.not.empty
            expect(res.body.product).to.be.not.empty
  
            expect(res.body._id).to.exist
            expect(res.body.customer).to.exist
            expect(res.body.product).to.exist
            expect(res.body.qty).to.exist
            done()
          })
      })
    })
    describe('delete product', function() {
      it('should return deleted object', function(done) {
        chai.request(app)
          .delete(`/products/${productId}`)
          .set('access_token', access_token)
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).status(200)
            expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'series', 'image')
            expect(res.body._id).to.be.a('string')
            expect(res.body.name).to.be.a('string')
            expect(res.body.description).to.be.a('string')
            expect(res.body.price).to.be.a('number')
            expect(res.body.stock).to.be.a('number')
            expect(res.body.series).to.be.a('string')
            expect(res.body.image).to.be.a('string')
  
            expect(res.body.name).to.be.not.empty
            expect(res.body.description).to.be.not.empty
            expect(res.body.series).to.be.not.empty
            expect(res.body.image).to.be.not.empty
  
            expect(res.body._id).to.exist
            expect(res.body.name).to.exist
            expect(res.body.description).to.exist
            expect(res.body.price).to.exist
            expect(res.body.stock).to.exist
            expect(res.body.series).to.exist
            expect(res.body.image).to.exist
            done()
          })
      })
    })
  })
})