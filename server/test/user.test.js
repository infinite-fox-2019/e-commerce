const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHTTP)

before(function () {
    const seed = JSON.parse(fs.readFileSync('./test/seed/users.json'))
    return User.insertMany(seed)
})

after(function () {
    return User.deleteMany({})
})

describe('User Route', function () {
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
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('username')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.not.have.property('password')
                    const { username, email, token } = res.body
                    expect(username).to.equal(data.username)
                    expect(email).to.equal(data.email)
                    expect(token).to.be.a('string')
                    expect(token).to.include('Bearer ')
                    done()
                })
        })

        it('Fail Register User - Validation Error', function (done) {
            const data = {
                username: "tigor",
                email: "tigor@email.com",
                password: "12345"
            }
            chai.request(app)
                .post('/users/register')
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('code')
                    expect(res.body).to.have.property('message')
                    expect(res.body.code).to.equal(400)
                    expect(res.body.message).to.be.an('array')
                    done()
                })
        })
    })

})
