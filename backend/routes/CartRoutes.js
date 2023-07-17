const express = require('express');
const router = express.Router();
const { addItemToCart,getCartItems,deleteCartItem } = require('../controllers/CartControllers'); 

router.post('/',addItemToCart);

router.get('/',getCartItems);

router.delete('/remove/:id',deleteCartItem);


module.exports = router