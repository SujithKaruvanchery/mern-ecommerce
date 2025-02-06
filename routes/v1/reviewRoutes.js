const { getProductReview, deleteReview, getAverageRating, addOrUpdateReview } = require('../../controller/reviewControllers');
const { userAuth } = require('../../middleware/userAuth');


const reviewRouter = require('express').Router()

reviewRouter.get('/get-reviews/:productId', userAuth, getProductReview);
reviewRouter.post('/addOrUpdateReview', userAuth, addOrUpdateReview);
reviewRouter.delete('/delete-review/:reviewId', userAuth, deleteReview);
reviewRouter.get('/get-average-rating/:productId', userAuth, getAverageRating);

module.exports = reviewRouter