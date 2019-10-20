const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const db = require('../models/user')

chai.use(chaiHttp)


before(function () {
    db.collection.deleteMany({})
});
describe('User', function () {
    describe('register', function () {
        // Success
        it.only('should add new user without error and status 201', function (done) {
            let body = {
                username: 'Sigit',
                email: 'sigit@gmail.com',
                password: '12345',
                role: 'admin'
            }

            chai.request(app)
                .post('/user/register')
                .send(body)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.all.keys(
                        'username',
                        'email',
                        'role',
                        'token'
                    )
                    done()
                })
        });

        // Username is required
        it.only('should error with status 400 and message "Username is required!"', function (done) {
            let body = {
                username: '',
                email: 'reyna@gmail.com',
                password: '12345',
                role: 'admin'
            }

            chai.request(app)
                .post('/user/register')
                .send(body)
                .end((err, res) => {
                    expect(res.body[0]).to.be.equal('Username is required!')
                    expect(res).to.have.status(400)
                    done()
                })
        })

        // username is already taken
        it.only('should error with status 400 and message "Username is already taken"', function (done) {
            let body = {
                username: 'Sigit',
                email: 'sigit111@gmail.com',
                password: '12345',
                role: 'admin'
            }

            chai.request(app)
                .post('/user/register')
                .send(body)
                .end((err, res) => {
                    expect(res.body[0]).to.be.equal('Username is already taken')
                    expect(res).to.have.status(400)
                    done()
                })
        })

        // email is required
        it.only('should error with status 400 and message "Email is required!"', function (done) {
            let body = {
                username: 'budi',
                email: '',
                password: '12345',
                role: 'admin'
            }

            chai.request(app)
                .post('/user/register')
                .send(body)
                .end((err, res) => {
                    expect(res.body[0]).to.be.equal('Email is required!')
                    expect(res).to.have.status(400)
                    done()
                })
        })

        // email is already taken
        it.only('should error with status 400 and message "Email is already taken"', function (done) {
            let body = {
                username: 'budi',
                email: 'sigit@gmail.com',
                password: '12345',
                role: 'admin'
            }

            chai.request(app)
                .post('/user/register')
                .send(body)
                .end((err, res) => {
                    expect(res.body[0]).to.be.equal('Email is already taken')
                    expect(res).to.have.status(400)
                    done()
                })
        })
    })

    describe('login', function () {
        // login succes
        it.only('should login without error and status 200 and user will get token, role and username', function (done) {
            let body = {
                identity: 'sigit@gmail.com',
                password: '12345',
            }

            chai.request(app)
                .post('/user/login')
                .send(body)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.all.keys(
                        'role',
                        'username',
                        'token'
                    )
                    done()
                })
        });

        // Username / email / password wrong
        it.only('should error with status 401 and message is "Wrong Username / Email / Password"', function (done) {
            let body = {
                identity: 'ahmad',
                password: '123',
            }

            chai.request(app)
                .post('/user/login')
                .send(body)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.equal('Wrong Username / Email / Password')
                    done()
                })
        });
    });
});
