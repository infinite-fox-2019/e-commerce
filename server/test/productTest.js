const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const Product = require('../models/product');

const expect = chai.expect

chai.use(chaihttp);

describe('Product test', function() {
    describe('POST /products', function() {
        beforeEach(function(done) {
            Product.deleteMany({}, done)
        })

        it('should create a product when call the POST method', function(done) {
            let body = {
                name: 'Kaos kaki supreme',
                description: 'kaos kaki mahal doang, ga bagus',
                price: 15000,
                stock: 10
            }

            chai.request(app)
                .post('/products')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.own.property('_id')
                    expect(res.body).to.have.own.property('name')
                    expect(res.body).to.have.own.property('price')
                    expect(res.body).to.have.own.property('stock')
                    done()
                })
        })

        it('should return validation error when name is empty', function(done) {
            let body = {
                name: '',
                description: 'kaos kaki mahal doang, ga bagus',
                price: 15000,
                stock: 10
            }

            chai.request(app)
                .post('/products')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Product name cannot be empty')
                    done()
                })

        })
        it('should return validation error when price is null/empty', function(done) {
            let body = {
                name: 'Kaos kaki supreme',
                description: 'kaos kaki mahal doang, ga bagus',
                price: null,
                stock: 10
            }

            chai.request(app)
                .post('/products')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Price cannot be empty')
                    done()
                })
        })
        it('should return validation error when stock is null/empty', function(done) {
            let body = {
                name: 'Kaos kaki supreme',
                description: 'kaos kaki mahal doang, ga bagus',
                price: 15000,
                stock: null
            }

            chai.request(app)
                .post('/products')
                .send(body)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body[0]).to.equal('Stock cannot be empty')
                    done()
                })
        })

    })
})