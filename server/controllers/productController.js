const Product = require('../models/Products')

class ProductCont {

  static async add(req,res,next){
    try {
      let {name,price,quantity,detail,image} = req.body
      if(req.file){
        image = req.file.cloudStoragePublicUrl
      } else {
        image = ''
      }
      const created = await Product.create({
        name,
        price,
        quantity,
        detail,
        image})
      res.status(200).json(created)
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let updatedField = req.body
      let arr = ['name','price','quantity','detail','image']
      let {_id} = req.params
      let obj = {}
      for (let key in updatedField){
        arr.forEach((element)=>{
          if (key === element){
            obj[key] = updatedField[key] 
          }
        })
      }
      const updated = await Product.updateOne({_id},{$set:obj})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }


  static async findAll(req,res,next){
    try {
    const products = await Product.find()
    res.status(200).json(products) 
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let _id = req.params._id
      const product = await Product.findById({_id})
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let {_id} = req.params
      const deleted = await Product.deleteOne({_id})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }


}

module.exports = ProductCont