const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const Product = require('../models/product');
const asert = require('assert');

chai.use(chaiHttp);

after(function() {
    Product.deleteMany({})
    .then(_=>{
        console.log('sukses delete');
    })
    .catch(console.log)
})
describe('Product Test', () => {
    describe('/products', function() {
        it('product',function(){
            let body = {
                name: 'Aventador',
                category: 'Lamborghini',
                price: 1500000,
                description: 'Miniatur Super Car'
            }
            chai.request(app)
                .post('/products')
                .send(body)
                .end (function (err, res) {
                    console.log('masuk dong pak eko')
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.succes(201);
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('category');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('description');
                })
        })
    })
    // describe('/login', function() {
    //     it('test',function(){
    //         let body = {
    //             Productname: 'ericsudhartio',
    //             password: 'sudhartioeric'
    //         }
    //         chai.request(app)
    //             .post('/login')
    //             .send(body)
    //             .end(function(err,res){
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //             })
    //     })
    // })
})
