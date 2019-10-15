const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')
const gcsdelete = require('../helpers/gcsdelete')

chai.use(chaiHTTP)

before(function () {
    // Seed Database
    return
})

after(function () {
    // Delete database 
    return
})

describe('Product Route', function () {
    let imageurl = null

    afterEach(function () {
        if (imageurl) {
            gcsdelete(imageurl)
            imageurl = null
        }
        return
    })
    describe('Create Product', function () {
        it('Success Create Product', function (done) {
            this.timeout(10000)
            const data = {
                name: "Mi Home Kit",
                price: 4500000,
                stock: 30,
            }
            chai.request(app)
                .post('/products')
                .type('form')
                .field('name', 'Mi Home Kit')
                .field('price', '4500000')
                .field('stock', '30')
                .attach('image', fs.readFileSync('./test/seed/assets/mi-kit.png'), 'mi-kit.png')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('name', 'price', 'stock', 'image')
                    const { name, price, stock, image } = res.body
                    expect(name).to.equal(data.name)
                    expect(price).to.equal(data.price)
                    expect(stock).to.equal(data.stock)
                    expect(image).to.include('https://storage.googleapis.com/')
                    imageurl = image
                    done()
                })
        })
    })
})