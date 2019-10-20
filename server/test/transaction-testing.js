const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const db = require('../models/product')

chai.use(chaiHttp)


before(function () {
    db.collection.deleteMany({})
})

describe('Admin', function () {
    describe('add Product', function () {
        it('Should add product without error and status is 201', function(done){
            let body = {
                name: 'Lemari',
                category: 'perabot',
                description: 'Lemari 2 pintu',
                price: 100000,
                stock: 10,
                imgUrl: 'ahahah.xyz'
            }
            let headers = {
                token : 'jahjd36h363je8au'
            }

            chai
                .request(app)
                .post('/addProduct')
                .send(body, headers)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.all.keys(
                        'name',
                        'category',
                        'description',
                        'price',
                        'stock',
                        'imgUrl'
                    )
                    done()
                })
        })
    })
})