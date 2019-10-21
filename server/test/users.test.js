'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { User } = require('../models')
const expect = chai.expect

chai.use(chaiHttp)

after(function (done) {
  // Run this to delete the new created user after testing
  User.deleteOne({ email: 'hana@mail.com' })
    .then(result => {
      console.log('Users already deleted')
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

// Test User Login & Register
describe('User Route', function () {
  describe('USER /register', function () {
    it('It should return error messages for mongoose validation errors', function (done) {
      chai.request(app)
        .post('/users/register')
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf(3)
            expect(res.body[0]).to.be.equal('Username is required')
            expect(res.body[1]).to.be.equal('E-mail is required')
            expect(res.body[2]).to.be.equal('Password is required')
            done()
          }
        })
    })

    it('It should return error message for name validation', function (done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: 'andreas@e-commerce.com', password: 'andreasandreas' })
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf(1)
            expect(res.body[0]).to.be.equal('Username is required')
            done()
          }
        })
    })

    it('It should create a new user and return new user object', function (done) {
      const user = {
        username: 'hana',
        email: 'hana@mail.com',
        password: 'hanahana'
      }

      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body.username).to.equal(user.username)
            expect(res.body.email).to.equal(user.email)
            done()
          }
        })
    })
  })

  describe('USER /login', function () {
    it('It should return access token after successfully logged in', function (done) {
      const customerLogin = {
        email: 'hana@mail.com',
        password: 'hanahana'
      }

      chai.request(app)
        .post('/users/login')
        .send(customerLogin)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.include.all.keys('token', 'user')
            expect(res.body.user).to.include.all.keys('username', 'email', 'id')
            expect(res.body.user.email).to.equal(customerLogin.email)
            done()
          }
        })
    })
    it('It should return error message due invalid email/password', function (done) {
      chai.request(app)
        .post('/users/login')
        .send({ email: 'hana@mail.com', password: 'healthy' })
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(404)
            expect(res.body).to.be.equal('Invalid email/password!')
            done()
          }
        })
    })
  })
})
