const ProductDB = require('../model/productModel');
const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const SellerDB = require('../model/sellerModel')

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
        const { title, description, price, image, stockQuantity, category, isNewArrival } = req.body;
        const { id } = req.user;
        console.log("=======id", id);

        if (!title || !description || !price || !stockQuantity || !category) {
            return res.status(400).json({ message: 'All fields must be filled out, including category.' });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);

        const savedProduct = new ProductDB({
            title,
            description,
            price,
            stockQuantity,
            image: uploadResult.url,
            seller: id,
            category,
            isNewArrival
        });

        await savedProduct.save();

        await SellerDB.findByIdAndUpdate(id, { $push: { products: savedProduct._id } });

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

// const productCategory = async (req, res) => {
//     try {
//         const { category } = req.params

//         const productsCategory = await ProductDB.find({ category })

//         res.status(200).json({ message: 'Product fetched successfully', data: productsCategory });

//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
//     }
// }

// const productCategory = async (req, res) => {
//     try {
//         const { category } = req.params;
//         const { sort } = req.query;

//         const query = { category };

//         let sortOption = {};
//         if (sort === "asc") sortOption = { price: 1 };
//         if (sort === "desc") sortOption = { price: -1 };

//         const productsCategory = await ProductDB.find(query).sort(sortOption);

//         if (!productsCategory || productsCategory.length === 0) {
//             return res.status(404).json({ message: "No products found" });
//         }

//         res.status(200).json({ 
//             message: "Product fetched successfully", 
//             data: productsCategory 
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message || "Internal Server Error" });
//     }
// };

const productCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { sort, page = 1, limit = 8 } = req.query;

        const query = { category };

        let sortOption = {};
        if (sort === "asc") sortOption = { price: 1 };
        if (sort === "desc") sortOption = { price: -1 };

        const totalProducts = await ProductDB.countDocuments(query);

        const productsCategory = await ProductDB.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        if (!productsCategory || productsCategory.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            data: productsCategory,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// const productNewArrival = async (req, res) => {
//     try {

//         const newArrivalProduct = await ProductDB.find({ isNewArrival: true });

//         if (!newArrivalProduct || newArrivalProduct.length === 0) {
//             return res.status(404).json({ message: 'No new arrivals found' });
//         }

//         res.status(200).json({ message: 'New arrival products fetched successfully', data: newArrivalProduct });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message || "Internal Server Error" });
//     }
// };

// const productNewArrival = async (req, res) => {
//     try {
//         const { category } = req.query;

//         const query = { isNewArrival: true };
//         if (category) {
//             query.category = category;
//         }

//         const newArrivalProduct = await ProductDB.find(query);

//         if (!newArrivalProduct || newArrivalProduct.length === 0) {
//             return res.status(404).json({ message: 'No new arrivals found' });
//         }

//         res.status(200).json({ 
//             message: 'New arrival products fetched successfully', 
//             data: newArrivalProduct 
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message || "Internal Server Error" });
//     }
// };

const productNewArrival = async (req, res) => {
    try {
        const { category, page = 1, limit = 8 } = req.query;

        const query = { isNewArrival: true };
        if (category) {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const newArrivalProduct = await ProductDB.find(query)
            .skip(skip)
            .limit(Number(limit));

        const totalProducts = await ProductDB.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        if (!newArrivalProduct || newArrivalProduct.length === 0) {
            return res.status(404).json({ message: 'No new arrivals found' });
        }

        res.status(200).json({
            message: 'New arrival products fetched successfully',
            data: newArrivalProduct,
            totalPages
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

const getTotalProductCount = async (req, res) => {
    try {
        console.log("Fetching total product count...");

        const count = await ProductDB.countDocuments();

        console.log("Total Products Count:", count);

        res.status(200).json({ totalProducts: count });
    } catch (error) {
        console.error("Error fetching total product count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateProductStock = async (req, res) => {
    try {
        const { productId, quantityPurchased } = req.body;

        console.log('Received request to update product stock');
        console.log('Product ID:', productId);
        console.log('Quantity Purchased:', quantityPurchased);

        if (quantityPurchased <= 0) {
            console.log('Invalid quantity purchased');
            return res.status(400).json({ message: 'Invalid quantity purchased' });
        }

        const product = await ProductDB.findById(productId);

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product found:', product);
        console.log('Current Stock Quantity:', product.stockQuantity);

        if (product.stockQuantity < quantityPurchased) {
            console.log('Not enough stock available');
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        product.stockQuantity -= quantityPurchased;

        console.log('Updated Stock Quantity:', product.stockQuantity);

        const updatedProduct = await product.save();

        console.log('Product stock updated successfully:', updatedProduct);

        res.status(200).json({
            message: 'Product stock updated successfully',
            data: updatedProduct
        });

    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateProductByAdmin = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductDB.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await ProductDB.findByIdAndUpdate(productId, req.body, { new: true });

        res.status(200).json({ message: 'Product updated successfully by admin', data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProductByAdmin = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductDB.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully by admin', data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, productCategory, productNewArrival, getTotalProductCount, updateProductStock, updateProductByAdmin, deleteProductByAdmin };
