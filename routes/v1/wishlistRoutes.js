const { addToWishlist, removeFromWishlist } = require('../../controller/wishlistControllers');
const { userAuth } = require('../../middleware/userAuth');

const wishlistRouter = require('express').Router()

wishlistRouter.post("/add-to-wishlist", userAuth, addToWishlist);
wishlistRouter.delete("/remove-from-wishlist/:productId", userAuth, removeFromWishlist);

module.exports = wishlistRouter;
