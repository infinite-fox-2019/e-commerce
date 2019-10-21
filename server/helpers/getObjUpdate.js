function getObjUpdate(body) {
    let allowedField = ['name', 'description', 'stock', 'price', 'category']
    let obj = {}
    allowedField.forEach(el => {
        for (let field in body) {
            if (el == field) {
                obj[field] = body[field]
            }
        }
    })
    obj.category = obj.category.split(' ')
    return obj
}

module.exports = getObjUpdate