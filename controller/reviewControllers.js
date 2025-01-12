const ProductDB = require('../model/productModel')
const ReviewDB = require('../model/reviewModel')

const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log('=======productId', productId);

        const reviews = await ReviewDB.find({ productId }).populate('userId', 'name').sort({ createdAt: -1 });
        console.log('=======reviews', reviews);

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews available for this product' });
        }

        res.status(200).json({ message: 'Product reviews retrieved successfully', data: reviews });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
};

module.exports = {getProductReview}