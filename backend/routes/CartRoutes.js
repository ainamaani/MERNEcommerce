const express = require('express');
const router = express.Router();
const { addItemToCart,getCartItems,deleteCartItem } = require('../controllers/CartControllers'); 
const RequireAuth = require('../middleware/RequireAuth');


router.post('/',addItemToCart);

router.get('/',getCartItems);

router.delete('/remove/:id',deleteCartItem);

router.use(RequireAuth);


module.exports = router