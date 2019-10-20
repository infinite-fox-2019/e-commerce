var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const User = require('../models/user')
const app = require('../app');

chai.use(chaiHttp)

after(function() {
    return User.deleteMany({role : 'customer'})
});

describe('User Routes', function(){
    describe('POST /users', function(){
        it('Create/Register user success', function(done){
            let newUser = {
                name: "Charlotte Lawrence",
                address : "61 Clemons Crossing",
                email: "charlce@amazon.com",
                password: "toolate"
            }
            chai.request(app).post('/users')
            .send(newUser)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201);
                expect(res).to.be.an('object')
                expect(res.body).to.have.all.keys('name', 'address', 'email', 'password', 'token', 'cart', 'history', 'role')
                done()
            })
        })
    })
    describe('POST /users', function(){
        it('Error Validation Unique Email', function(done){
            let newUser = {
                name: "Charlotte Lawrence",
                address : "61 Clemons Crossing",
                email: "charlce@amazon.com",
                password: "toolate"
            }
            chai.request(app).post('/users')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.all.keys('errMsg')
                expect(res.body.errMsg[0]).to.equal('Email is already registed')
                done()
            })
        })
    })
    describe('POST /users', function(){
        it('Error Validation Required Field', function(done){
            let newUser = {}
            chai.request(app).post('/users')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.all.keys('errMsg')
                expect(res.body.errMsg).to.be.an('array')
                done()
            })
        })
    })
        describe('POST /users/login', function(){
            it ('Login user success', function(done){
                let userLogin = {
                    email: "charlce@amazon.com",
                    password: "toolate"
                }
                chai.request(app).post('/users/login')
                .send(userLogin)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'address', 'email', 'token', 'role', 'cart', 'history')
                    done()
                })
            })
        })

})