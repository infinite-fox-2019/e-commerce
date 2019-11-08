const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

describe('Server Test', function () {
    it('Get Server Test Message', function (done) {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})