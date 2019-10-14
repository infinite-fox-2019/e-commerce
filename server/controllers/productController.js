const Product = require('../models/product');
const Brand = require('../models/brand');

class ProductController {
    static findAll(req,res,next){
        Product.find().sort([['brand','ascending']])
            .then(products=>{
                res.status(200).json(products);
            })
            .catch(err=>{
                next(err);
            })
    }
    static create(req,res,next){
        const {name,category,price,description,brand} = req.body;
        const image = req.file.cloudStoragePublicUrl;
        Product.create(
            {
                name,
                category,
                price,
                description,
                image,
                brand
            })
            .then(product=>{
                return Brand.findOneAndUpdate({
                    name : product.brand
                },{
                    $push: {ProductId : product._id}
                })
            })
            .then(_=>{
                res.status(201).json({msg:'sukses created'});
            })
            .catch(err=>{
                if(err.errmsg == 'E11000 duplicate key error collection: e-commerce-test.products index: name_1 dup key: { : "aventador" }'){
                    next({status:403,msg:'nameUsed'})
                }else{
                    next(err)
                }
            })
    }
    static update(req,res,next){
        const id = req.params.id;
        const {name,category,stock,description,price} = req.body;
        Product.findByIdAndUpdate({
            _id: id
        },{
            name,category,stock,description,price
        })
            .then(_=>{
                res.status(201).json({msg: "Success Update"});
            })
            .catch(err=>{
                next(err);
            })
    }
    static delete(req,res,next){
        const id = req.params.id;
        Product.deleteOne({
            _id : id
        })
            .then(product=>{
                console.log(product)
                res.status(200).json({msg: "Success Delete"});
            })
            .catch(err=>{
                next(err)
            })
    }
}


module.exports = ProductController;