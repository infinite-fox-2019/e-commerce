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


describe('Product', function() {

    describe('Add Product', function() {
        it(`createa new product when calling post method`, function(done) {
            let product = {
                name: 'PRODUCT 1',
                description: 'PRODUCT 1',
                image: 'url',
                price: 10000,
                stock: 10
            }
            chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .send(product)
                .end(function(err,res) {
                    expect(res).to.have.status(201);
                    expect(res.body).to.include.all.keys('name', 'description', 'image', 'price', 'stock');
                    ProductId = res.body._id;
                    done();
                })
                
        });

        it(`should return 401 when not admin wanna add product`, function(done) {
            let product = {
                name: 'PRODUCT 1',
                description: 'PRODUCT 1',
                price: 10000,
                stock: 10
            }
            chai.request(app)
                .post('/products')
                .set('token', memberToken)
                .send(product)
                .end(function(err,res) {
                    expect(res).to.have.status(403);                
                    done();
                });
        }); 
  

        it(`shold return product when get method called'`, function(done) {
            chai.request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(res).to.has.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object').to.include.all.keys('_id', 'name', 'description', 'stock', 'price', 'image')
                    done();
                })
        });

    
        it(`should return one product when calling get method`, function(done) {
            
            chai.request(app)
                .get(`/products/${ProductId}`)
                .end(function(err, res) {
                    expect(res).to.has.status(200);
                    expect(res.body).to.be.an('object').to.include.all.keys('_id', 'name', 'description', 'stock', 'price', 'image')
                    done();
                })
        });

        


    })
})