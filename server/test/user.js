const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')

chai.use(chaihttp)

describe('User testing',function(){
    describe('USER/ register',function(){
        after(function(){
            return User.deleteMany({})
        }) 
        it('should return token,username when there is no error',function(done){
            let userTesting = {
                username: 'fadhil15',
                email: 'fadhil@mail.com',
                password: 'adfas'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(res.body).to.be.an('object')
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.all.keys('username','token','email','id')
                    done()
                })
        })
        it('password cannot be empty',function(done){
            let userTesting = {
                username: 'fadhil15',
                email: 'fadhil@mail.com',
                password: null
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('password is required')
                    done()
                })
        })
        it('email cannot be empty',function(done){
            let userTesting = {
                username: 'fadhil15',
                email: null,
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('email is required')
                    done()
                })
        })
        it('invalid email format',function(done){
            let userTesting = {
                username: 'fadhil15',
                email: 'dfsfsfd',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('invalid email format')
                    done()
                })
        })
        it('username cannot be empty',function(done){
            let userTesting = {
                username: null,
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('username is required')
                    done()
                })
        })
    })
    describe('user/login',function(){
        before(function(done){
            let userTesting = {
                username: 'fadhil15',
                email: 'fadhil@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err,res){
                    expect(res.body).to.be.an('object')
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.all.keys('username','token','email','id')
                    done()
                })
        })
        after(function(){
            return User.deleteMany({})
        }) 
        it('should return token,username,email when there is no error',function(done){
            let userTesting = {
                email: 'fadhil@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/login')
                .send(userTesting)
                .end(function(err,res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.all.keys('username','token','email','id')
                    done()
                })
        })
        
    })
})