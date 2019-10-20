var chai = require('chai');
var chaiHttp = require('chai-http');
const Transaction = require('../models/transaction')
var expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp)

let tokenAdmin
let tokenCustomer
let idKuas
let idCat
let trxId 

after(function() {
    return Transaction.deleteMany({})
})

describe('FLOW transaction', function(){

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
                        tokenAdmin = res.body.token
                        expect(err).to.be.null
                        expect(res).to.have.status(200);
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.all.keys('name', 'address', 'email', 'token', 'role', 'cart')
                        done()
                    })
            })
        })
    })
    describe('Create Item1 Kuas', function () {
        it('Return an object with property of data item', function (done) {
            let newItem = {
                name: 'Kuas Kipas',
                description: 'for best quality art',
                featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
                stock: 6,
                price: '18000',
                tags: ['high quality', 'best seller', 'expert']
            }
            chai.request(app).post('/items')
                .set('token', tokenAdmin)
                .send(newItem)
                .end(function (err, res) {
                    idKuas = res.body._id
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id','name', 'description',
                    'featured_image', 'stock', 'price', 'tags', 'createdAt', 'updatedAt')
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
        })
    })

    describe('Create Item1 Cat', function () {
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
                .set('token', tokenAdmin)
                .send(newItem)
                .end(function (err, res) {
                    idCat = res.body._id
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('_id','name', 'description',
                    'featured_image', 'stock', 'price', 'tags', 'createdAt', 'updatedAt')
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
        })
    })

    describe('POST /users', function(){
        it('Create/Register user success', function(done){
            let newUser = {
                name: "Customer Test",
                address : "61 Clemons Crossing",
                email: "testpurpose@amazon.com",
                password: "toolate"
            }
            chai.request(app).post('/users')
            .send(newUser)
            .end(function(err, res){
                tokenCustomer = res.body.token
                expect(err).to.be.null
                expect(res).to.have.status(201);
                expect(res).to.be.an('object')
                expect(res.body).to.have.all.keys('name', 'address', 'email', 'password', 'token', 'role', 'cart')
                done()
            })
        })
    })

    describe('PATCH /users/add/:id (add cart)', function(){
        it('add id tokenKuas to cart user', function(done){
            chai.request(app).patch(`/users/add/${idKuas}`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('cart')
                expect(res.body.cart).to.be.an('array').that.includes(idKuas)
                done()
            })
        })
    })

    describe('PATCH /users/remove/:id (remove cart)', function(){
        it('add id tokenKuas to cart user', function(done){
            chai.request(app).patch(`/users/remove/${idKuas}`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('cart')
                done()
            })
        })
    })
    
    describe('PATCH /users/add/:id (add cart)', function(){
        it('add id tokenCat to cart user', function(done){
            chai.request(app).patch(`/users/add/${idCat}`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('cart')
                expect(res.body.cart).to.be.an('array').that.includes(idCat)
                done()
            })
        })
    })
    describe('PATCH /users/add/:id (add cart)', function(){
        it('add id tokenCat to cart user', function(done){
            chai.request(app).patch(`/users/add/${idCat}`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('cart')
                expect(res.body.cart).to.be.an('array').that.includes(idCat)
                done()
            })
        })
    })

    describe('GET /users/account (get user data)', function(){
        it('include all data except password, createdAt, updateAt', function(done){
            chai.request(app).get(`/users/account`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.all.keys('_id', 'name', 'address', 'email', 'cart', 'history', 'role')
                done()
            })
        })
    })

    describe('POST /transactions', function(){
        it('clean cart in user an retun an object and status 201', function(done){
            chai.request(app).post('/transactions')
            .set('token', tokenCustomer)
            .end(function(err, res){
                trxId = res.body.trx._id
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.all.keys('trx','user')
                expect(res.body.trx).to.be.an('object')
                expect(res.body.user).to.be.an('object')
                expect(res.body.trx).to.have.all.keys('_id', 'user','listItem', 'totalItem','totalPayment',
                'deliveryStatus', 'statusTrx', 'createdAt', 'updatedAt')
                expect(res.body.user).to.have.property('history')
                expect(res.body.user.history).to.be.an('array').that.includes(res.body.trx._id)
                expect(res.body.user.cart).to.be.an('array').that.is.empty
                done()
            })
        })
    })

    describe('PATCH /transactions/delivery/:id (arrived)', function(){
        it('Status should be 200 return an object', function(done){
            chai.request(app).patch(`/transactions/delivery/${trxId}`)
            .set('token', tokenCustomer)
            .send({status : true })
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('message')
                expect(res.body.message).to.equal('Thank you for purchasing with us')
                done()
            })
        })
    })

    describe('PATCH /transactions/delivery/:id (returned)', function(){
        it('Status should be 200 return an object', function(done){
            chai.request(app).patch(`/transactions/delivery/${trxId}`)
            .set('token', tokenCustomer)
            .send({status : false })
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('message')
                expect(res.body.message).to.equal('Delivery status change to false')
                done()
            })
        })
    })

    describe('PATCH /transactions/cancel/:id (cancelation change to false)', function(){
        it('Status should retun 200 and return obj wtih property message', function(done){
            chai.request(app).patch(`/transactions/cancel/${trxId}`)
            .set('token', tokenCustomer)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('message')
                expect(res.body.message).to.equal('Cancelation will be full process less in 24 hours')
                done()
            }) 
        })
    })

})