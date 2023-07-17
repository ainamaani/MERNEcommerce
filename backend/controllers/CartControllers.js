const Cart = require('../models/Cart');

const addItemToCart = async(req,res) =>{
    const {product_id,title,price,itemPhotoUrl,discount} = req.body;
    try {
        const addcartitem = await Cart.create({product_id,title,price,addtime: Date.now().toString(),itemPhotoUrl,discount});
        if(addcartitem){
            res.status(200).json(addcartitem);
        }
        else{
            res.status(400).json({error: "Could not add item to the cart"});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const getCartItems = async(req,res) =>{
    try {
        const cartitems = await Cart.find({});
        if(cartitems){
            res.status(200).json(cartitems);
        }else{
            res.status(400).json({error: "Could not get all the cart items"});
        }
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const deleteCartItem = async(req,res) => {
    const {id} = req.params;
    try {
        const itemdeleted = await Cart.findByIdAndDelete(id);
        if(itemdeleted){
            res.status(200).json(itemdeleted)
        }else{
            res.status(400).json({ error: "Failed to delete cart item"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    addItemToCart,getCartItems,deleteCartItem
}