import Product from '../models/product'
import _ from 'lodash'

//create
export const create = (req, res) => {
    const product = new Product(req.body);
    console.log(product);
    product.save((err, result) => {
        if(err){
            res.status(400).json({
                errors: 'Khong them duoc san pham'
            })
        }
        res.json(result);
    })
}

//read
export const productByID = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product;
        next();
    })
} 

export const read = (req, res) => {
    
    return res.json(req.product)
}


//list
export const list = (req, res) => {
    Product.find((err, product) => {
        if(err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(product)
    })
}


//remove
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deletedProduct,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}

//update
export const update = (req, res) => {
    Product.findOneAndUpdate(
        { _id  : req.product._id },
        { $set : req.body},
        {new : true },(err,product)=>{
          if(err){
            res.status(400).json({
              error : "Không thể update được product"
            })
          }
          res.json(product);
        }
      )
}