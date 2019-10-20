var chai = require('chai');
var chaiHttp = require('chai-http');
const Transaction = require('../models/transaction')
var expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp)

let tokenAdmin

after(function() {
    return Transaction.deleteMany({})
})

describe('FLOW transaction ADMIN', function(){

        describe('POST /users/login', function () {
            it('Login Admin success', function (done) {
                let userLogin = {
                    email: "admin@mail.com",
                    password: "12345678"
                }
                chai.request(app).post('/users/login')
                    .send(userLogin)
                    .end(function (err, res) {
                        tokenAdmin = res.body.token
                        expect(err).to.be.null
                        expect(res).to.have.status(200);
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.all.keys('name', 'address', 'email', 'token', 'role', 'cart', 'history')
                        done()
                    })
            })
        })

            describe('POST /transactions/income', function () {
                it('status 200', function (done) {
                    chai.request(app).post('/transactions/income')
                        .set("token", tokenAdmin)
                        .send({deliveryStatus: true})
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200);
                            expect(res).to.be.an('object')
                            console.log(res.body);
                            expect(res.body).to.have.all.keys('transactions')
                            expect(res.body.transactions).to.be.an('array')
                            done()
                        })
                })
    })
    describe('POST /transactions/income', function () {
        it('status 200', function (done) {
            chai.request(app).post('/transactions/income')
                .set("token", tokenAdmin)
                .send({deliveryStatus: false})
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object')
                    console.log(res.body);
                    expect(res.body).to.have.all.keys('transactions')
                    expect(res.body.transactions).to.be.an('array')
                    done()
                })
        })
})
})