const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')

chai.use(chaihttp)

describe('Cart Testing',function(){
    let token
    let userId
    let productId
    after(function(done){
        Cart.deleteMany({})
        Product.deleteMany({})
        User.deleteMany({})
        done()
    })
    before(function(done){
        let userTesting = {
            username: 'baba',
            email: 'baba@mail.com',
            password: '123'
        }
        let productTesting = {
            name: 'iphonex',
            desc: 'type x, version 5.0',
            price: 5000000,
            stock: 10
        }
        chai
            .request(app)
            .post('/user/register')
            .send(userTesting)
            .end(function(err,res){
                token = res.body.token
                userId = res.body.id
                console.log(res.body.token,'ini bodyyyyy');
                
                
                // expect(res).to.have.status(201)
                expect(res.body).to.have.all.keys('username','token','email','id')
                done()
            })
        chai
            .request(app)
            .post('/products')
            .send(productTesting)
            .end(function(err,res){                    
                productId = res.body._id
                expect(res.body).to.have.all.keys('_id','name','desc','price','stock')
                // done()
            })
    })

    describe('create cart auth',function(){
        it('must return userId, productId',function(done){
            console.log(token,'ini token');
            console.log(userId,'user id');
            console.log(productId,'product id ini');
            
            let cart = {
                userId,
                productId
            }
            chai
                .request(app)
                .post('/carts')
                .send(cart)
                .set({ token })
                .end(function(err,res){
                    
                    
                    
                    console.log(res.body,'ini carts');
                    
                    expect(res.body).to.have.all.keys('_id','userId','productId')
                    done()
                })
        })
    })
})