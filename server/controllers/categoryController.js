const Category = require('../models/category')

class categoryController {
    static displayAll(req, res, next) {
        Category.find()
            .then(category_data => {
                res.status(200).json(category_data)
            })
            .catch(next)
    }

    static create(req, res, next) {
        console.log(req.body)
        const createdData = {
            name: req.body.name
        }
        Category.create(createdData)
            .then(created_data => {
                res.status(201).json(created_data)
            })
            .catch(next)
    }

}

module.exports = categoryController