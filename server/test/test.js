const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')
const User = require('../models/User')

describe('User Testing', function() {
  after(function () {
    User.deleteMany({})
  })
  describe('register', function() {
    it('should return id, username, and access_token', function(done) {
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
        
      })
      done()
    })
  })
})