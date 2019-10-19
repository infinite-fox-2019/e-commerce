const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

const SECRET_KEY = process.env.SECRET_KEY

chai.use(chaiHTTP)

before(function () {
    this.timeout(60000)
    const seed = JSON.parse(fs.readFileSync('./test/seed/users.json'))
    return User.insertMany(seed)
})

after(function () {
    this.timeout(60000)
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

        it('Register as Admin', function (done) {
            const data = {
                username: "admin",
                email: "admin@email.com",
                password: "12345",
                SECRET_KEY
            }

            chai.request(app)
                .post('/users/register/admin')
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('role')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('username')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.not.have.property('password')
                    const { username, email, token, role } = res.body
                    expect(username).to.equal(data.username)
                    expect(email).to.equal(data.email)
                    expect(role).to.equal('admin')
                    expect(token).to.be.a('string')
                    expect(token).to.include('Bearer ')
                    done()
                })
        })

        it('Fail Register User - Validation Error', function (done) {
            const data = {
                username: "Tigor",
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

        it('Fail Register Admin - Wrong Secret Key', function (done) {
            const data = {
                username: "admin2",
                email: "admin2@email.com",
                password: "12345",
                SECRET_KEY: "12345"
            }
            chai.request(app)
                .post('/users/register/admin')
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(401)
                    expect(message).to.equal('SECRET_KEY does not match')
                    done()
                })
        })
    })

    describe('Login User', function () {
        it('Success login user', function (done) {
            const data = {
                identity: 'tigor@email.com',
                password: '12345'
            }
            chai.request(app)
                .post('/users/login')
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('username', 'email', 'token', 'role')
                    const { token } = res.body
                    expect(token).to.include('Bearer ')
                    done()
                })
        })

        it('Fail login user', function (done) {
            const data = {
                identity: 'tigor',
                password: '12'
            }
            chai.request(app)
                .post('/users/login')
                .send(data)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('code', 'message')
                    const { code, message } = res.body
                    expect(code).to.equal(401)
                    expect(message).to.equal('Wrong Username / Email / Password')
                    done()
                })
        })
    })
})
