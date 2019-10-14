const chai = require('chai')
const chaiHTTP = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHTTP)

after(function () {
    // Delete database 
    return
})