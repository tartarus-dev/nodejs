import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    detail: {
        type: String,
        // required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        // required: true,
        maxlength: 32
    },
    status: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    },
    cateId : {
        type: ObjectId,
        ref: "Category",
        required: true
    }


}, { timestamps: true})

module.exports = mongoose.model("Product", productSchema)