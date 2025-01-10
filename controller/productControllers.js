const ProductDB = require('../model/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductDB.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found in the database' });
        }

        res.status(200).json({
            message: 'Products fetched successfully', data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await ProductDB.findById(productId).populate('seller');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product details fetched successfully', data: product
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};


module.exports = { getAllProducts, getProductById };
