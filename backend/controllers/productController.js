// backend/controllers/productController.js
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const query = { ...keyword };

        // --- CHANGE IS HERE ---
        // Patha code lo 10 undedi, ippudu manam limit teesestunnam (Leda pedda number pedtunnam)
        // Deenivalla frontend ki anni products veltayi
        
        const products = await Product.find(query); 
        
        // Okavela future lo pagination kavali ante kinda lines uncomment cheyochu
        // const pageSize = 1000; 
        // const page = Number(req.query.pageNumber) || 1;
        // .limit(pageSize).skip(pageSize * (page - 1));

        res.json({ products });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById };