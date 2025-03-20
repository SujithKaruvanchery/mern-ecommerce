const ProductDB = require('../model/productModel')
const ReviewDB = require('../model/reviewModel')
const OrderDB = require('../model/orderModel')

const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ReviewDB.find({ productId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: reviews.length
                ? 'Product reviews retrieved successfully'
                : 'No reviews available for this product',
            data: reviews
        });

    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addOrUpdateReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        console.log('Request body:', req.body);
        console.log('User ID:', userId);

        const product = await ProductDB.findById(productId);

        if (!product) {
            console.log('Product not found:', productId);
            return res.status(404).json({ message: 'No products found in the database' });
        }

        console.log('Product found:', product);

        if (rating > 5 || rating < 1) {
            console.log('Invalid rating:', rating);
            return res.status(400).json({ message: 'Please provide a valid rating between 1 and 5' });
        }

        const order = await OrderDB.findOne({
            userId,
            "items.productId": productId,
            orderStatus: "Delivered Successfully",
        });

        console.log('Order:', order);

        if (!order) {
            console.log('Order not found or not delivered:', order);
            return res.status(400).json({ message: 'You must have received the product to leave a review' });
        }

        const existingReview = await ReviewDB.findOne({ userId, productId });

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();
            console.log('Review updated:', existingReview);
            return res.status(200).json({ message: 'Review updated successfully', data: existingReview });
        } else {
            const newReview = new ReviewDB({
                userId,
                productId,
                rating,
                comment,
            });
            await newReview.save();
            console.log('Review created:', newReview);
            return res.status(201).json({ message: 'Review added successfully', data: newReview });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        if (!reviewId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid review ID" });
        }

        const review = await ReviewDB.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toHexString() !== userId) {
            return res.status(403).json({ message: "You can only delete your own reviews" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully", reviewId });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAverageRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ReviewDB.find({ productId });

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ message: 'Product average rating fetched successfully', data: averageRating });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { getProductReview, addOrUpdateReview, deleteReview,getAverageRating }