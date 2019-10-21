const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/ecommerce-test'
const app = require('../app')
const User = require('../models/User')
const expect = chai.expect

chai.use(chaiHttp)

let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWNlM2EzY2FjOGIwMmUwZTcwMmVkMyIsImlhdCI6MTU3MTYxMTU1Nn0.iQhO7acBG6qE7HJmmfYMlxcipQl8BbCG3iolQYjsWJc'
let memberToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWNjM2ExNTA4NDhjNzQzM2JjOWNiZiIsImlhdCI6MTU3MTYxMTY2MH0.KJWAHM-7anRu2uHnWf5QVlu3gIT284WZArrAdsFEmgY'


describe('User', function () {

    describe('POST users/register', function () {
        let endPoint = '/users/register'

        before(function (done) {
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
                mongoose.connection.dropCollection('users')
                done()
            })
        })

        it('create new user when calling POST method', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'uzai@uzai.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.own.property('token')
                    done()
                })
        })

        it('should create a new admin when calling POST method', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: `admin@admin.com`,
                    password: '123',
                    role: 'admin'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.property('status')
                    expect(res.status).to.equal(201)
                    expect(res.body).to.own.property('token')
                    done()
                })
        })

        it('should return error message if email empty', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: '',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
        })


        it('should return error if email format is invalid', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'notEmail',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.property('status')
                    expect(res.status).to.equal(400)
                    done()
                })
        })


        it('should return error if password is empty', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'uzai@uzai.com',
                    password: ''
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.property('status')
                    expect(res.status).to.equal(400)
                    done()
                })
        })

    })

    describe('POST /users/login', function () {
        let endPoint = `/users/login`

        it('should return a token when calling post method', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'uzai@uzai.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.own.property('token')
                    done()
                })
        })

        it('should return error message if username is wrong', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'notUzai@uzai.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.property('status')
                    expect(res).to.have.status(403)
                    done()
                })
        })

        it('should return error message if password is wrong', function (done) {
            chai.request(app)
                .post(endPoint)
                .send({
                    email: 'uzai@uzai.com',
                    password: '555'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.property('status')
                    expect(res).to.have.status(403)
                    done()
                })
        })

    })
})