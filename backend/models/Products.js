const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
        min:0
    },
    quantity:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String, 
        required:true  
    },
    discount:{
        type:String,
        default:0,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Product',ProductSchema);