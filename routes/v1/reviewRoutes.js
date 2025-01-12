const { getProductReview, addReview, deleteReview } = require('../../controller/reviewControllers');
const { userAuth } = require('../../middleware/userAuth');


const reviewRouter = require('express').Router()

reviewRouter.get('/get-reviews/:productId', userAuth, getProductReview);
reviewRouter.post('/add-product-review', userAuth, addReview);
reviewRouter.delete('/delete-review', userAuth, deleteReview);
// reviewRouter.get('/get-avg-rating', userAuth, getAverageRating);

module.exports = reviewRouter