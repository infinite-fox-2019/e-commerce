// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const Cart = require('../models/cart')

// chai.use(chaiHttp)

// // after(function(){
// //     return Cart.deleteMany({})
// // })

// describe('Cart Test', () => {
//     describe('POST /carts', function(done) {
//         it('Should have user's email and products to buy to add a cart', function() {
//             let body = {
//                 user: 'zura@mail.com',
//                 product: ['Denko Sekka']
//             }
//             chai.request(app)
//                 .post('/carts')
//                 .send(body)
//                 .end (function (err, res) {
//                     console.log(res.body)
//                     expect(err).to.be.null
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.have.property('user')
//                     expect(res.body).to.have.property('product')
//                 })
//         })
//     })

//     describe('GET /carts', function(done) {
//         it('Should return all carts data', function() {
//             chai.request(app)
//                 .get('/carts')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                 })
//         })
//     })
    
// })