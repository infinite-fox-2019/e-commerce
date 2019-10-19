const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')
const User = require('../models/User')

describe('User Testing', function() {
  after(function (done) {
    User.deleteMany({})
    .then(_ => {
      done()
    })
  })
  describe('register', function() {
    it('should return id, username, email, hashed_password and access_token', function(done) {
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
    // it('should return id, description, price, stock, series, and image', function(done) {
    //   let body = {
    //     name: 'SHF Spider-Man Stealth Suit',
    //     description: 'The new Spider-Man action figure from S.H.Figuarts with the look of Stealth Suit from Spider-Man: Far From Home',
    //     price: 1300000,
    //     stock: 8,
    //     series: 'S.H.Figuarts',
    //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP3hRANixXOeth29UrXuNgVfFRZsTHXCNhcyb4htsft5IS48tB'
    //   }

    //   let adminUserBody = {
    //     username: 'adminmulti',
    //     email: 'admin@multi.com',
    //     password: 'adminmulti8',
    //     admin_password: 'infinitystone'
    //   }

    //   chai.request(app)
    //   .post('/register')
    //   .send(adminUserBody)
    //   .end((err, res) => {
    //     let access_token = res.body.access_token
    //     console.log(access_token)
    //     chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send(body)
    //     .end((err, res) => {
    //       expect(err).to.be.null
    //       expect(res).status(201)
    //       expect(res.body).to.be.an('object')
    //       expect(res.body).to.have.all.keys('id', 'name', 'description', 'price', 'stock', 'series', 'image')

    //       expect(res.body.id).to.be.a('string')
    //       expect(res.body.name).to.be.a('string')
    //       expect(res.body.description).to.be.a('string')
    //       expect(res.body.price).to.be.a('number')
    //       expect(res.body.stock).to.be.a('stock')
    //       expect(res.body.series).to.be.a('series')
    //       expect(res.body.image).to.be.a('image')

    //       expect(res.body.id).to.be.not.empty
    //       expect(res.body.name).to.be.not.empty
    //       expect(res.body.description).to.be.not.empty
    //       expect(res.body.price).to.be.not.empty
    //       expect(res.body.stock).to.be.not.empty
    //       expect(res.body.series).to.be.not.empty
    //       expect(res.body.image).to.be.not.empty

    //       expect(res.body.id).to.exist
    //       expect(res.body.name).to.exist
    //       expect(res.body.description).to.exist
    //       expect(res.body.price).to.exist
    //       expect(res.body.stock).to.exist
    //       expect(res.body.series).to.exist
    //       expect(res.body.image).to.exist
    //       done()
    //     })
    //   })
    // })
    // it('should return error message when input is empty string', function(done) {
    //   let body = {
    //     name: '',
    //     description: '',
    //     price: '',
    //     stock: '',
    //     series: '',
    //     image: 'dummylink'
    //   }
    //   chai.request(app)
    //   .post('/users/register')
    //   .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWFiYmQ2NmRmMDQ5Y2UxYTY3NDdiYSIsInVzZXJuYW1lIjoiYWRtaW56Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTcxNDc2ODgwfQ.fpJ29KQWDJogNtqft96Fi7sZATDAnmL36MGhfw6MtjI')
    //   .send(body)
    //   .end((err, res) => {
    //     expect(err).to.be.null
    //     expect(res).status(400)
    //     expect(res.body.messages).to.include('Name cannot be empty')
    //     expect(res.body.messages).to.include('Description cannot be empty')
    //     expect(res.body.messages).to.include('Price cannot be empty')
    //     expect(res.body.messages).to.include('Stock cannot be empty')
    //     expect(res.body.messages).to.include('You have to choose a series')
    //     done()
    //   })
    // })
    // it('should return an error message when input is invalid', function(done) {
    //   let body = {
    //     name: 'a',
    //     description: 'a',
    //     price: 0,
    //     stock: -1,
    //     series: 'S.H.Figuarts',
    //     image: 'dummylink'
    //   }
    //   chai.request(app)
    //   .post('/users/register')
    //   .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWFiYmQ2NmRmMDQ5Y2UxYTY3NDdiYSIsInVzZXJuYW1lIjoiYWRtaW56Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTcxNDc2ODgwfQ.fpJ29KQWDJogNtqft96Fi7sZATDAnmL36MGhfw6MtjI')
    //   .send(body)
    //   .end((err, res) => {
    //     expect(err).to.be.null
    //     expect(res).status(400)
    //     expect(res.body.messages).to.include('Price cannot be zero or less')
    //     expect(res.body.messages).to.include('Stock cannot be zero or less')
    //     done()
    //   })
    // })
  })
})