const ProductDB = require('../model/productModel');
const { cloudinaryInstance } = require("../config/cloudinaryConfig");

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductDB.find();

        if (!products || products.length === 0) {
            return res.json({ message: 'No products found in the database' });
        }

        res.json({
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await ProductDB.findById(productId).populate('seller');

        if (!product) {
            return res.status(404).json({ message: 'No products found in the database' });
        }

        res.status(200).json({
            message: 'Product details fetched successfully', data: product
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, image, stockQuantity } = req.body;
        const { id } = req.user;

        if (!title || !description || !price || !stockQuantity) {
            return res.status(400).json({ message: 'All fields must be filled out.' });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);

        const savedProduct = new ProductDB({ title, description, price, stockQuantity, image: uploadResult.url, seller: id });
        await savedProduct.save();

        res.status(200).json({ message: 'Product created successfully', data: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await ProductDB.findByIdAndUpdate(productId, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found in the system' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductDB.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'No products found in the database' });
        }

        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
