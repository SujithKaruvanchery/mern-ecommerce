const { addToWishlist, removeFromWishlist, getWishlist } = require('../../controller/wishlistControllers');
const { userAuth } = require('../../middleware/userAuth');

const wishlistRouter = require('express').Router()

wishlistRouter.post("/add-to-wishlist", userAuth, addToWishlist);
wishlistRouter.delete("/remove-from-wishlist/:productId", userAuth, removeFromWishlist);
wishlistRouter.get("/get-wishlist", userAuth, getWishlist);

module.exports = wishlistRouter;
