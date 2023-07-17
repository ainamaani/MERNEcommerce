const Product = require('../models/Products');

const getProducts = async(req,res) =>{
    //fetch all the products
    try {
        const products = await Product.find({});
        if(products){
            res.status(200).json(products);
        }else{
            res.status(400).json({error: "Could not fetch all the products"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const addProducts = async(req,res) =>{
    //destructure the req object
    const {title,description,category,price,quantity,imageUrl,discount} = req.body;
    //adding a project
    try {
        const product = await Product.create({title, description,category,price,quantity,imageUrl,discount});
        if(product){
            res.status(200).json(product)
        }else{
            res.status(400).json({error: "Could not add the product"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getCategories = async(req,res) =>{
    try {
        const categories = await Product.distinct('category');
        if(categories){
            res.status(200).json(categories);
        }else{
            res.status(400).json({error: "Could not fetch the categories"});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const getCategoryItems = async(req,res) =>{
    const {category} = req.params;
    try {
        const categoryItems = await Product.find({category:category});
        if(categoryItems){
            res.status(200).json(categoryItems);
        }else{
            res.status(400).json({error: "Could not fetch the required products"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getProduct = async(req,res) =>{
    const {id} = req.params;
    try {
        const singleproduct = await Product.findById(id);
        if(singleproduct){
            res.status(200).json(singleproduct);
        }else{
            res.status(400).json({error: "Could not fetch the specified product"});
        }
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const updatedFields = req.body;
    try {
        const updatedproduct = await Product.findByIdAndUpdate(id,updatedFields,{new:true});
        if(updatedproduct){
            res.status(200).json(updatedproduct)
        }else{
            res.status(400).json({error: "Could not update the requested update"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    try {
        const deleted = await Product.findByIdAndDelete(id);
        if(deleted){
            res.status(200).json(deleted);
        }else{
            res.status(400).json({error: "Could not delete the product"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getProducts,addProducts,getCategories,getCategoryItems,getProduct,updateProduct,deleteProduct
}