// VARIABLE DECLARATION
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')
const expect = chai.expect
chai.use(chaiHttp)


describe('User Test', () => {
    after(function() {
        return User.deleteMany({})
    })
    describe('Register New User', () => {
        it('Should Return Error When Missing Field / Incorrect Format', (done) => {
            const body = {
                username: "Arnold",
                email: "arnold@mail.com",
                password: "123"
            }
            chai.request(app)
            .post('/user/register')
            .send(body)
            .end((err,res) => {
                expect(err).to.equal(null)
                expect(res).to.have.status(201)
                expect(res.body).to.have.all.keys('username', "email", "token", "role")
                expect(res.body.username).to.be.a("string")
                expect(res.body.email).to.be.a("string")
                expect(res.body.token).to.be.a("string")
                expect(res.body.role).to.be.a("string")
            })
            done()
        })
        it("Username Should Not Be Empty", (done) => {
            const body = {
                username: null,
                email: "arnold@mail.com",
                password: "123"
            }
            chai.request(app)
            .post("/user/register")
            .send(body)
            .end((err,res) => {
                expect(() => {
                    throw new Error(res.body.msg)
                }).to.throw("Username Is Required")
            })
            done()
        })
        it("Email Should Not Be Empty", (done) => {
            const body = {
                username: "Arnold",
                email: null,
                password: "123"
            }
            chai.request(app)
            .post("/user/register")
            .send(body)
            .end((err,res) => {
                expect(() => {
                    throw new Error(res.body.msg)
                }).to.throw("Email Is Required")
            })
            done()
        })
        it("Password Should Not Be Empty", (done) => {
            const body = {
                username: "Arnold",
                email: "arnold@mail.com",
                password: null
            }
            chai.request(app)
            .post("/user/register")
            .send(body)
            .end((err,res) => {
                expect(() => {
                    throw new Error(res.body.msg)
                }).to.throw("Password Is Required")
            })
            done()
        })
    })
})