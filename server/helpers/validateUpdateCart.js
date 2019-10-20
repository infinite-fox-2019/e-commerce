const Product = require('../models/product')
module.exports = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.data) {
            err = new Error("Request body must have a property named 'data'")
            err.status = 400
            return reject(err)
        }
        if (!Array.isArray(body.data)) {
            err = new Error("Wrong data type - data must be an array")
            err.status = 400
            return reject(err)
        }

        const { data } = body
        let promises = []

        for (let i = 0; i < data.length; i++) {
            let err = []
            const el = data[i];
            if (!el.product && el.quantity) { err.push("Product id must be set") }
            if (!el.quantity && el.product) { err.push("Buy amount must be set") }
            if (err.length) return reject({ status: 400, message: err })
            promises.push(Product.findById(el.product))
        }

        Promise.all(promises)
            .then((results) => {
                if (!results.every(el => {
                    console.log(el)
                    return el
                })) {
                    err = new Error("There's no product with such id")
                    err.status = 400
                    reject(err)
                }
                resolve()
            })
    })
}