const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const Product = require('../models/Product')

chai.use(chaihttp)

describe('Product Testing',function(){
    let id
    after(function(){
        return Product.deleteMany({})
    }) 
    describe('create product',function(){
        it('should return _id name desc price stock',function(done){
            let productTesting = {
                name: 'iphonex',
                desc: 'type x, version 5.0',
                price: 5000000,
                stock: 10
            }
            chai
                .request(app)
                .post('/products')
                .send(productTesting)
                .end(function(err,res){                    
                    id = res.body._id
                    expect(res.body).to.have.all.keys('_id','name','desc','price','stock')
                    done()
                })
        })
    })
    describe('delete product',function(){
        it('should return deleteCount equals to ok',function(done){
            chai
                .request(app)
                .delete(`/products/:${id}`)
                .end(function(err,res){
                    expect(res.body.deleteCount).to.equal(res.body.ok)
                    done()
                })
        })
    })
})