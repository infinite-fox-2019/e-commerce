const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')

chai.use(chaihttp)

describe('Product testing', function(){
    let id
    after(function(){
        return Product.deleteMany({})
    })
    describe('create product', function(){
        it('must return _id, name, desc, price, stock', function(done){
            let product = {
                name: 'bawang',
                desc: 'bawangBawangan',
                price: 3000,
                stock: 20
            }
            chai
                .request(app)
                .post('/products')
                .send(product)
                .end(function(err, res){
                    expect(res.body).to.have.all.keys('_id', 'name', 'desc', 'price', 'stock')
                    id = res.body._id
                    done()
                })
        })
    })
    describe('delete product', function(){
        it('must return n, ok, deleteCount', function(done) {
            chai
                .request(app)
                .delete(`/products/${id}`)
                .end(function(err, res){
                    expect(res.body.deleteCount).to.equal(res.body.ok)
                    done()
                })
        })
    })
})