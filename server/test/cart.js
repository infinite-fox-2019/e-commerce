const chai = require('chai')
const expect = chai.expect
const chaihttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product')

chai.use(chaihttp)

describe('Cart testing', function(){
    let token
    let user_id
    let product_id

    after(function(done){
        Cart.deleteMany({})
        User.deleteMany({})
        Product.deleteMany({})
        done()
    })

    before(function(done){
        let userTesting = {
            username: 'arnold',
            email: 'arnold@mail.com',
            password: '123'
        }
        let product = {
            name: 'bawang',
            desc: 'bawangBawangan',
            price: 3000,
            stock: 20
        }
        chai
            .request(app)
            .post('/user/register')
            .send(userTesting)
            .end(function(err, res){
                expect(res.body).to.have.all.keys('username','token','_id')
                token = res.body.token
                user_id = res.body._id
            })
        chai
            .request(app)
            .post('/products')
            .send(product)
            .end(function(err, res){
                expect(res.body).to.have.all.keys('_id', 'name', 'desc', 'price', 'stock')
                product_id = res.body._id
                done()
            })
    })

    describe('create cart authentication', function(){
        it('must return _id, user_id, product_id', function(done){
            let cart = {
                user_id,
                product_id
            }
            chai
                .request(app)
                .post('/carts')
                .send(cart)
                .set({ token })
                .end(function(err, res){
                    expect(res.body).to.have.all.keys('_id','user_id','product_id')
                    done()
                })

        })
    })
})