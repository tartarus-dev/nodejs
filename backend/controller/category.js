import Category from '../models/category';

//create
export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, result) => {
        if(err){
            res.status(400).json({
                errors: 'Khong them duoc san pham'
            })
        }
        res.json(result);
    })
}


//read
export const categoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: 'Product not found'
            })
        }
        req.category = category;
        next();
    })
}
export const read = (req, res) => {
    
    return res.json(req.category)
}


//list
export const list = (req, res) => {
    Category.find((err, category) => {
        if(err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(category)
    })
}


//remove
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deletedCategory,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}


//update
export const update = (req, res) => {
    Category.findOneAndUpdate(
        { _id  : req.category._id },
        { $set : req.body},
        {new : true },(err,category)=>{
          if(err){
            res.status(400).json({
              error : "Không thể update được category"
            })
          }
          res.json(category);
        }
      )
}