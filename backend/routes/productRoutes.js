const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// /api/products ki request vaste idi run avtundi
router.get('/', getProducts);

// /api/products/123 ki request vaste idi run avtundi
router.get('/:id', getProductById);

module.exports = router;