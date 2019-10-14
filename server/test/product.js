// VARIABLE DECLARATION
const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/product')
const app = require('../app')
const expect = chai.expect
chai.use(chaiHttp)


describe('Product Test', () => {
    after(function() {
        return Product.deleteMany({})
    })
    describe('Add New Product', () => {
        it('Should Return Error When Missing Field / Incorrect Format', (done) => {
            const body = {
                name: "Black Mug",
                description: "A Mug To Fulfill Your Basic Needs",
                stock: 10,
                price: 10
            }
            chai.request(app)
            .post('/product')
            .send(body)
            .end((err,res) => {
                expect(err).to.equal(null)
                expect(body).to.have.all.keys("name", "description", "stock", "price")
                expect(body.name).to.be.a("string")
                expect(body.description).to.be.a("string")
                expect(body.stock).to.be.a("number")
                expect(body.price).to.be.a("number")
                expect(body.stock).to.be.above(0)
                expect(body.price).to.be.above(0)
                expect(res).to.have.status(201)
                expect(res.body).to.have.all.keys('response')
                expect(res.body.response).to.equal("Product Created Successfully")
                done()
            })
        })
    })
})