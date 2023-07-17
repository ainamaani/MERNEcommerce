const express = require('express');
const router = express.Router();
const { getProducts,addProducts,getCategories,getCategoryItems,getProduct,
        updateProduct,deleteProduct } = require('../controllers/ProductControllers');

router.get('/', getProducts);

router.post('/', addProducts);

router.get('/categories',getCategories);

router.get('/categories/:category',getCategoryItems);

router.get('/:id',getProduct);

router.patch('/:id',updateProduct);

router.delete('/:id',deleteProduct);

module.exports = router