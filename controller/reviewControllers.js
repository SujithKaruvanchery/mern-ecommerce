const ProductDB = require('../model/productModel')
const ReviewDB = require('../model/reviewModel')

const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ReviewDB.find({ productId }).populate('userId', 'name').sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews available for this product' });
        }

        res.status(200).json({ message: 'Product reviews retrieved successfully', data: reviews });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
};

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;
        console.log('=======userId', userId);

        const product = await ProductDB.findById(productId);
        console.log('=======product', product);

        if (!product) {
            return res.status(404).json({ message: 'No products found in the database' });
        }

        if (rating > 5 || rating < 1) {
            return res.status(400).json({ message: 'Please provide a valid rating between 1 and 5' });
        }

        const review = await ReviewDB.findOneAndUpdate(
            { userId, productId },
            { rating, comment },
            { new: true, upsert: true }
        );
        console.log('=======review', review);

        res.status(201).json({ message: 'Review added successfully', data: review });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};


module.exports = { getProductReview, addReview }