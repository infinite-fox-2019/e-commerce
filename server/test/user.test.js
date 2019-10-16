const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

describe('User Testing', function () {
  
  describe('POST /login', function () {
    let newUser = {
      name: 'Ahmad Fadilah',
      role: 'costumer',
      email: 'fadil@mail.com',
      password: 'fadil'
    }
    before(function(done) {
      // runs before all tests in this block
      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function (err, res) {done()})
    });
    after(function() {
      // runs after all tests in this block
      return User.deleteMany({})
    });
    it('should return token', function (done) {
      chai
        .request(app)
        .post('/login')
        .send({
          email: newUser.email,
          password: newUser.password
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.own.property('token')
          done()
        })
    })
  })
  describe('POST /register', function () {
    after(function() {
      // runs after all tests in this block
      return User.deleteMany({})
    });
    it('should return ObjectId, name, role, email, hashPass', function (done) {
      let newUser = {
        name: 'Ahmad Fadilah',
        email: 'fadil@mail.com',
        password: 'fadil'
      }
      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.all.keys('_id', 'name', 'role', 'email', 'password')
          expect(res.body.name).to.be.a('string')
          expect(res.body.role).to.be.a('string')
          expect(res.body.email).to.be.a('string')
          expect(res.body.password).to.be.a('string')
          expect(res.body.password).to.not.equal(newUser.password)
          done()
        })
    })
  })
})