const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')

describe('User Testing', function() {
  describe('register', function() {
    it('should return id, username, and access_token', function() {
      let body = {
        username: 'stephenstrange',
        email: 'stephen@strange.com',
        password: 'strange221',
        admin_password: 'infinitystone'
      }

      chai.request(app)
      .post('/user')
      .send(body)
      .end((err, res) => {
        expect(res).to.have.status(201)
      })
    })
  })
})