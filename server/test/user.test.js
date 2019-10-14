const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

before(function (done) {
    // run seed here
    done()
})

after(function (done) {
    // run empty db here
    done()
})

describe('Register User', function () {
    it('Sucess Register User', function (done) {
        const data = {
            username: "whoami",
            email: "secret@email.com",
            password: "12345"
        }
        chai.request(app)
            .post('/users/register')
            .send(data)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.all.keys('username', 'email', 'token')
                const { username, email, token } = res.body
                expect(username).to.equal(data.username)
                expect(email).to.equal(data.email)
                expect(token).to.be.a('string')
                expect(token).to.include('Bearer')
                done()
            })
    })
})