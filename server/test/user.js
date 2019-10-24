const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaihttp)

describe('User testing', function(){
    describe('user register', function(){
        afterEach(function(){
            return User.deleteMany({})
        })
        it('username cannot be empty', function(done){
            let userTesting = {
                username: '',
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('username is required')
                    done()
                })
        })
        it('email cannot be empty', function(done){
            let userTesting = {
                username: 'arnold',
                email: '',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('email is required')
                    done()
                })
        })
        it('password cannot be empty', function(done){
            let userTesting = {
                username: 'arnold',
                email: 'arnold@mail.com',
                password: ''
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('password is required')
                    done()
                })
        })
        it('email must be unique', function(done){
            let userTesting = {
                username: 'arnold',
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){})
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('email is already taken')
                    done()
                })
        })
        it('invalid email format', function(done){
            let userTesting = {
                username: 'arnold',
                email: 'arnold',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('invalid email format')
                    done()
                })
        })
        it('register should return token, username', function(done){
            let userTesting = {
                username: 'arnold',
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(res.body).to.have.all.keys('username','token','_id')
                    done()
                })
        })
    })
    describe('user login', function(){
        before(function(done){
            let userTesting = {
                username: 'arnold',
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/register')
                .send(userTesting)
                .end(function(err, res){
                    expect(res.body).to.have.all.keys('username','token','_id')
                    done()
                })
        })
        after(function(){
            return User.deleteMany({})
        })
        it('invalid email/password', function(done){
            let userTesting = {
                email: 'arnoldiiiii@mail.com',
                password: '12333333'
            }
            chai
                .request(app)
                .post('/user/login')
                .send(userTesting)
                .end(function(err, res){
                    expect(function(){
                        throw new TypeError(JSON.parse(res.error.text).message[0])
                    }).to.throw('invalid email/password')
                    done()
                })
        })
        it('login should return token, username', function(done){
            let userTesting = {
                email: 'arnold@mail.com',
                password: '123'
            }
            chai
                .request(app)
                .post('/user/login')
                .send(userTesting)
                .end(function(err, res){
                    expect(res.body).to.have.all.keys('username','token','_id')
                    done()
                })
        })
    })
})
