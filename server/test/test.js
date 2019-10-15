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
        expect(res.body).to.have.all.keys('id', 'username', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
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
    it('should return error messages when input format is invalid', function(done) {
      let body = {
        username: 'aaaaa',
        email: 'aaa@.com',
        password: 'a'
      }
      chai.request(app)
      .post('/users/register')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body.messages).to.include('Username have to be at least 6 characters')
        expect(res.body.messages).to.include('aaa@.com is not a valid email format')
        expect(res.body.messages).to.include('Password has to be at least 6 characters and contains letter and number')
        done()
      })
    })
    it('should return error messages when username already registered', function(done) {
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
    it('should return error messages when email already registered', function(done) {
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
        expect(res.body).to.have.all.keys('id', 'username', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
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
})