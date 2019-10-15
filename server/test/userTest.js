const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const Product = require('../models/product');

const expect = chai.expect
chai.use(chaihttp)


describe('User Test', function() {
    let itemId
    before(function(done) {
        let product = {
            name: 'Kaos kaki supreme',
            description: 'kaos kaki mahal doang, ga bagus',
            price: 15000,
            stock: 10
        }
        Product.create(product)
            .then(product => {
                itemId = product._id
                done()
            })
            .catch(console.log)
    })

    after(function(done) {
        Product.deleteMany({})
        User.deleteMany({}, done)
    })

    describe('POST  /users/register', function() {
        beforeEach(function(done) {
            User.deleteMany({}, done)
        })

        it('should create a new user when call the POST method', function(done) {
            let body = {
                email: 'john@doe.com',
                name: 'john doe',
                password: '12345'
            }

            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.own.property('name')
                    expect(res.body).to.have.own.property('role')
                    expect(res.body).to.have.own.property('email')
                    expect(res.body).to.have.own.property('password')
                    done()
                })
        })

        it('should create a new admin user', function(done) {
            let body = {
                email: 'jane@doe.com',
                name: 'jane doe',
                password: 'admin',
                role: 'admin'
            }

            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.own.property('_id')
                    expect(res.body).to.have.own.property('name')
                    expect(res.body).to.have.own.property('role')
                    expect(res.body).to.have.own.property('email')
                    expect(res.body).to.have.own.property('password')
                    done()
                })
        })
        it('should return validation error when email is empty', function(done) {
            let body = {
                email: '',
                password: '12345',
                name: 'john doe',
                role: 'user'
            }


            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Email address cannot be empty')
                    done()
                })
        })

        it('should return validation error when password is empty', function(done) {
            let body = {
                email: 'john@doe.com',
                password: '',
                name: 'john doe',
                role: 'user'
            }

            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Password cannot be empty')
                    done()
                })
        })

        it('should return validation error when name is empty', function(done) {
            let body = {
                email: 'john@doe.com',
                password: '12345',
                name: '',
                role: 'user'
            }

            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Name cannot be empty')
                    done()
                })
        })


        it('should return validation error when email format is invalid', function(done) {
            let body = {
                email: 'johndoeatmaildotcom',
                password: '12345',
                name: 'john doe',
                role: 'user'
            }

            chai.request(app)
                .post('/users/register')
                .send(body)
                .end(function(err, res) {
                    console.log(res.body[0]);
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Invalid email address')
                    done()
                })
        })



    })
    describe('POST /users/login', function() {
        before(function(done) {
            User.create({
                    email: 'john@doe.com',
                    name: 'john doe',
                    password: '12345'
                })
                .then()
                .catch(console.log)
            done()

            after(function(done) {
                User.deleteMany({}, done)
            })
        })
        it('should return a token if success', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({ email: 'john@doe.com', password: '12345' })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).has.own.property('token')
                    done()
                })
        })

        it('should return bad request error when email is empty', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({ email: '', password: '12345' })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Wrong email/password')
                    done()
                })
        })
        it('should return bad request error when password is empty', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({ email: 'john@doe.com', password: '' })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Wrong email/password')
                    done()
                })
        })
        it('should return bad request error when email and is empty', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({ email: '', password: '' })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Wrong email/password')
                    done()
                })
        })
    })

    describe('POST /users/cart', function() {
        let token
        before(function(done) {
            let user = {
                name: 'John Doe',
                email: 'john@doe.com',
                password: '12345'
            }

            User.create(user)
                .then()
                .catch(console.log)
            done()
        })

        before(function(done) {
            chai.request(app)
                .post('/users/login')
                .send({ email: 'john@doe.com', password: '12345' })
                .end(function(err, res) {
                    token = res.body.token
                    done()
                })
        })

        it('should return success message when add to Cart', function(done) {
            chai.request(app)
                .post(`/users/cart`)
                .send({ items: [itemId] })
                .set({ token: token })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.own.property('message')
                    expect(res.body.message).to.equal('Successfully updated items in your cart')
                    done()
                })
        })

        it('should return success message when delete from cart', function(done) {
            chai.request(app)
                .post(`/users/cart`)
                .send({ items: [itemId] })
                .set({ token: token })
                .end(function(err, res) {

                })

            chai.request(app)
                .patch('/users/cart')
                .send({ items: [itemId] })
                .set({ token: token })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.own.property('message')
                    expect(res.body.message).to.equal('Successfully updated your cart')
                    done()
                })
        })
    })
})