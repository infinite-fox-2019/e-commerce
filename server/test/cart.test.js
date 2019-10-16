"use strict"
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const fs = require('fs')
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHTTP)

let userToken = null

before(function (done) {
    const user = {
        username: "tigor",
        email: "tigor@email.com",
        password: "12345"
    }

    function getUsertoken() {
        return new Promise((resolve, reject) => {
            chai.request(app)
                .post('/users/register')
                .send(user)
                .end(function (err, res) {
                    if (err) return reject(err)
                    userToken = res.body.token
                    resolve()
                })
        })
    }
    const productSeed = JSON.parse(fs.readFileSync('./test/seed/products.json'))

    Promise.all([getUsertoken(), Product.insertMany(productSeed)])
        .then(() => done())
})

after(function (done) {
    Promise.all([Product.deleteMany({}), User.deleteMany({})])
        .then(() => done())
})