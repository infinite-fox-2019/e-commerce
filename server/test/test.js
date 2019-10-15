const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')
const User = require('../models/User')

describe('User Testing', function() {
  describe('register', function() {
    after(function (done) {
      User.deleteMany({})
      .then(_ => {
        done()
      })
    })
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
        expect(res.body).to.have.all.keys('id', 'username', 'email', 'hashed_password', 'access_token')

        expect(res.body.id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.hashed_password).to.be.a('string')
        expect(res.body.access_token).to.be.a('string')

        expect(res.body.id).to.be.not.empty
        expect(res.body.username).to.be.not.empty
        expect(res.body.email).to.be.not.empty
        expect(res.body.hashed_password).to.be.not.empty
        expect(res.body.access_token).to.be.not.empty

        expect(res.body.id).to.exist
        expect(res.body.username).to.exist
        expect(res.body.email).to.exist
        expect(res.body.hashed_password).to.exist
        expect(res.body.access_token).to.exist

        expect(res.password).to.be.not.equal(body.password)
        done()
      })
    })
    it('it should return error messages when input is invalid', function(done) {
      
    })
  })
})