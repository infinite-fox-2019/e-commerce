const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

// after(function(){
//     return Cart.deleteMany({})
// })

describe('Transaction Test', () => {
    // describe('POST /transactions', function(done) {
    //     it('Should have a cart to add a transaction', function() {
    //         let body = {
    //             cart: '123'
    //         }
    //         chai.request(app)
    //             .post('/transaction')
    //             .send(body)
    //             .end (function (err, res) {
    //                 console.log(res.body)
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(201)
    //                 expect(res.body).to.have.property('cart')
    //             })
    //     })
    // })

    describe('GET /transaction', function(done) {
        it('Should return all transactions data', function() {
            chai.request(app)
                .get('/transaction')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                })
        })
    })
    
})