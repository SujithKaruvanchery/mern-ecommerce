const { addToWishlist } = require('../../controller/wishlistControllers');
const { userAuth } = require('../../middleware/userAuth');

const wishlistRouter = require('express').Router()

wishlistRouter.post("/add-to-wishlist", userAuth, addToWishlist);

module.exports = wishlistRouter;
