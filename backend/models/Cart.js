const mongoose = require('mongoose');
const Product = require('./Products');

const CartSchema = new mongoose.Schema({
    product_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref: Product,
        required:true
    },
    title : {
        type:String,
        required:true
    },
    price : {
        type:String,
        required:true
    },
    itemquantity: {
        type:Number,
        default:1,
        min:1
    },
    itemPhotoUrl: {
        type:String,
        required:true
    },
    carttotal: {
        type:Number,
        default:1,
        min:1
    },
    discount:{
        type:String,
        required:true
    },
    addtime: {
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Cart',CartSchema);