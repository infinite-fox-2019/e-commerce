const Product = require('../models/product')
module.exports = async (body) => {
    if (!body.data) {
        let err = new Error("Request body must have a property named 'data'")
        err.status = 400
        throw err
    }
    if (!Array.isArray(body.data)) {
        let err = new Error("Wrong data type - data must be an array")
        err.status = 400
        throw err
    }
    const { data } = body
    let promises = []
    data.forEach(el => {
        promises.push(Product.findById(el.product))
    })

    let arrProduct = await Promise.all(promises)
    if (!arrProduct.every(el => el)) {
        let err = new Error("There's no product with such id")
        err.status = 404
        throw err
    }
    return
}