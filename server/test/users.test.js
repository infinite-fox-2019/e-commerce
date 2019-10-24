'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

const adminLogin = {
  email: 'admin@e-commerce.com',
  password: 'adminadmin'
}

const customerLogin = {
  email: 'andreas@e-commerce.com',
  password: 'andreasandreas'
}

const user = {
  name: 'Test',
  email: 'test@e-commerce.com',
  password: 'testtest'
}

after(function () {
  // run this to delete the new created user for testing
})

// Test User Login & Register
describe('User', function () {
  describe('Register', function () {
    it('It should return error messages for mongoose validation errors', function (done) {
      chai.request(app)
        .post('/users/register')
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf(3)
            expect(res.body[0]).to.be.equal('Name is required')
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
            expect(res.body[0]).to.be.equal('Name is required')
            done()
          }
        })
    })

    it('It should create a new user and return new user object', function (done) {
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.equal(user.name)
            expect(res.body.name).to.equal(user.email)
            done()
          }
        })
    })
  })

  describe('Login', function () {
    it('It should return access token after successfully logged in', function (done) {
      chai.request(app)
        .post('/users/login')
        .send(adminLogin)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.include.all.keys('token', 'user')
            expect(res.body.user).to.include.all.keys('email', 'id')
            expect(res.body.user.email).to.equal(adminLogin.email)
            done()
          }
        })
    })
    it('It should return error message due invalid email/password', function (done) {
      chai.request(app)
        .post('/users/login')
        .send({ email: 'admin@e-commerce.com', password: 'healthy' })
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(404)
            expect(res.body.message).to.be.equal('Invalid username/password!')
            done()
          }
        })
    })
  })
})
