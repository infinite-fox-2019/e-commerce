var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const Item = require('../models/item')
const app = require('../app');

chai.use(chaiHttp)

after(function () {
    return Item.deleteMany({})
});

let id 
let token

describe('Items Routes', function () {

    describe('POST /users/login', function () {
        describe('POST /users/login', function () {
            it('Login user success', function (done) {
                let userLogin = {
                    email: "admin@mail.com",
                    password: "123456"
                }
                chai.request(app).post('/users/login')
                    .send(userLogin)
                    .end(function (err, res) {
                        token = res.body.token
                        expect(err).to.be.null
                        expect(res).to.have.status(200);
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.all.keys('name', 'address', 'email', 'token')
                        done()
                    })
            })
        })
    })


    describe('POST /items', function () {
        describe('Create Items', function () {
            it('Create only by admin', function (done) {
                let newItem = {
                    name: 'Van Gogh',
                    description: 'for best quality paint',
                    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                    tags: ['high quality', 'best seller', 'expert'],
                    stock: 6,
                    price: '160000'
                }
                chai.request(app).post('/items')
                    .set('token', token)
                    .send(newItem)
                    .end(function (err, res) {
                        id = res.body._id
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
    })

    describe('POST /items', function () {
        describe('Error due to no token', function () {
            it('Return unauthorize status 401', function (done) {
                let newItem = {
                    name: 'Van Gogh',
                    description: 'for best quality paint',
                    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                    tags: ['high quality', 'best seller', 'expert'],
                    stock: 6,
                    price: '160000'
                }
                chai.request(app).post('/items')
                    .send(newItem)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        done()
                    })
            })
        })
    })

    describe('POST /items', function () {
        describe('Error create due validation', function () {
            it('Return errMsg as array status 400', function (done) {
                chai.request(app).post('/items')
                    .send(newItem)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
        })
    })

    describe('POST /items', function () {
        describe('Error due minimum stock && price', function () {
            it('Return object property errMsg status 400', function (done) {
                let newItem = {
                    name: 'Van Gogh',
                    description: 'for best quality paint',
                    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                    tags: ['high quality', 'best seller', 'expert'],
                    stock: 0,
                    price: '-1'
                }
                chai.request(app).post('/items')
                    .send(newItem)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
        })
    })

    describe('DELETE /items/:id', function () {
        describe('Delete one item', function () {
            it('should return object with property message', function (done) {
                chai.request(app).delete(`/items/${id}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        })
    })
})