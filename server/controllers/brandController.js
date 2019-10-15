const Brand = require('../models/brand');
const Product = require('../models/product');

class BrandController {
    static findAll(req,res,next){
        Brand.find()
            .then(brands=>{
                res.status(200).json(brands);
            })
            .catch(err=>{
                next(err);
            })
    }
    static create(req,res,next){
        Brand.create({
            name: req.body.name
        })
        .then(_=>{
            res.status(201).json('Success Created!');
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = BrandController;