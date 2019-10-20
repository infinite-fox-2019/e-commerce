var chai = require('chai');
var chaiHttp = require('chai-http');
const Item = require('../models/item')
var expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp)

after(function () {
    return Item.deleteMany({})
});

let id
let token

describe('Items Routes', function () {

    describe('POST /users/login', function(){
        it ('Login user success', function(done){
            let userLogin = {
                email: "admin@mail.com",
                password: '12345678'
            }
            chai.request(app).post('/users/login')
            .send(userLogin)
            .end(function(err, res){
                token = res.body.token
                expect(err).to.be.null
                expect(res).to.have.status(200);
                expect(res).to.be.an('object')
                expect(res.body).to.have.all.keys('name', 'address', 'email', 'token', 'role', 'cart', 'history')
                done()
            })
        })
    })


    describe('POST /items', function () {
        it('Return an object with property of data item', function (done) {
            let newItem = {
                name: 'Van Gogh',
                description: 'for best quality paint',
                featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                stock: 6,
                price: '160000',
                tags: ['high quality', 'best seller', 'expert']
            }
            chai.request(app).post('/items')
                .set('token', token)
                .send(newItem)
                .end(function (err, res) {
                    id = res.body._id
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id', 'name', 'description',
                        'featured_image', 'stock', 'price', 'tags', 'createdAt', 'updatedAt')
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
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
        describe('Error create, due to validation', function () {
            it('Return errMsg as array status 400', function (done) {
                chai.request(app).post('/items')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.an('array').that.includes('Title is required',
                            'Image is required', 'Description is required')
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
                    .set('token', token)
                    .send(newItem)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.an('array').that.includes('minium item to sell is 1', 'minium item to sell is 5')
                        done()
                    })
            })
        })
    })

    describe('GET /items (get all)', function () {
        it('should return an object with property items as array', function (done) {
            chai.request(app).get('/items')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done()
                })
        })
    })

    describe('GET /items/:id (get one)', function () {
        it('should return an object of data item', function (done) {
            chai.request(app).get(`/items/${id}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id', 'name', 'description',
                        'featured_image', 'stock', 'price', 'tags', 'createdAt', 'updatedAt')
                    done()
                })
        })
    })

    describe('PUT /items/:id', function () {
        it('Should return an object with an message property', function (done) {
            let updateItem = {
                name: 'Van Gogh Oil Paint',
                description: 'for best quality paint',
                featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                tags: ['high quality', 'best seller', 'expert'],
                stock: 100,
                price: '150000'
            }
            chai.request(app).put(`/items/${id}`)
                .set("token", token)
                .send(updateItem)
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.a.property('message')
                    expect(res.body.message).to.be.an('string').that.includes(`Success Update`)
                    expect(err).to.be.null
                    done()
                })
        })
    })

    describe('PATCH /items (increase stock)', function () {
        it('Should return an object with item name and stock', function (done) {
            let decrease = {
                _id: id,
                add: 50
            }
            chai.request(app).patch(`/items/stock`)
                .set('token', token)
                .send(decrease)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'stock')
                    expect(res.body.stock).to.be.a('number')
                    expect(res.body.stock).to.be.above(-1)
                    done()
                })
        })
    })

    describe('PATCH /items (decrease stock)', function () {
        it('Should return an object with item name and stock', function (done) {
            let decrease = {
                _id: id,
                add: -10
            }
            chai.request(app).patch(`/items/stock`)
                .set('token', token)
                .send(decrease)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'stock')
                    expect(res.body.stock).to.be.a('number')
                    expect(res.body.stock).to.be.above(-1)
                    done()
                })
        })
    })

    describe('PUT /items/:id', function () {
        describe('ERROR update by empty field', function () {
            it('Should return an object with an errMsg property', function (done) {
                chai.request(app).put(`/items/${id}`)
                    .set("token", token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.an('array').that.includes('Title is required',
                            'Image is required', 'Description is required')
                        done()
                    })
            })
        })
    })


    describe('PUT /items/:id', function () {
        describe('ERROR update due MINUM', function () {
            it('Should return an object with an errMsg property', function (done) {
                let updateItem = {
                    name: 'Van Gogh Oil Paint',
                    description: 'for best quality paint',
                    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                    tags: ['high quality', 'best seller', 'expert'],
                    stock: 0,
                    price: '100'
                }
                chai.request(app).put(`/items/${id}`)
                    .set("token", token)
                    .send(updateItem)
                    .end(function (err, res) {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.an('array').that.includes('minium item to sell is 5', 'minium item to sell is 1')
                        expect(err).to.be.null
                        done()
                    })
            })
        })
    })

    describe('PATCH /items', function () {
        describe('Error due dont accept -1 stock', function () {
            it('Should return an object with item name and stock', function (done) {
                let decrease = {
                    _id: id,
                    add: -999999
                }
                chai.request(app).patch(`/items/stock`)
                    .set('token', token)
                    .send(decrease)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.a('string').that.includes('Our stock only')
                        done()
                    })
            })
        })
    })

    describe('DELETE /items/:id', function () {
        it('should return object with property message', function (done) {
            chai.request(app).delete(`/items/${id}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.a.property('message')
                    expect(res.body.message).to.be.an('string').that.includes(`Success Delete`)
                    done()
                })
        })
    })

    describe('PUT /items/:id', function () {
        describe('ERROR update', function () {
            it('Should return an object with an errMsg property', function (done) {
                let updateItem = {
                    name: 'Van Gogh Oil Paint',
                    description: 'for best quality paint',
                    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                    tags: ['high quality', 'best seller', 'expert'],
                    stock: 100,
                    price: '150000'
                }
                chai.request(app).put(`/items/${id}`)
                    .set("token", token)
                    .send(updateItem)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.be.an('string').that.includes(`Item Not Found`)
                        expect(err).to.be.null
                        done()
                    })
            })
        })
    })




    describe('DELETE /items/:id', function () {
        describe('err no id', function () {
            it('should return object with property message', function (done) {
                chai.request(app).delete(`/items/${id}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.equal('Item Not Found')
                        done()
                    })
            })
        })
    })

    describe('GET /items/:id', function () {
        describe('err no id', function () {
            it('should return an object of data item', function (done) {
                chai.request(app).get(`/items/${id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.equal('Item Not Found')
                        done()
                    })
            })
        })
    })


    // Error due to token invalid 
    describe('PUT /items/:id', function () {
        describe('No token', function () {
            it('Should return an object with an message errMsg', function (done) {
                chai.request(app).put(`/items/${id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.equal('Unauthorized')
                        done()
                    })
            })
        })
    })


    describe('DELETE /items/:id', function () {
        describe('No token', function () {
            it('should return object with property errMsg', function (done) {
                chai.request(app).delete(`/items/${id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.have.a.property('errMsg')
                        expect(res.body.errMsg).to.equal('Unauthorized')
                        done()
                    })
            })
        })
    })

})