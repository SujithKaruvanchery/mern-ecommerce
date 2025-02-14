const WishlistDB = require('../model/wishlistModel');

const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?.id;

    console.log("Received request to add product to wishlist");
    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    if (!userId) {
        console.log("Unauthorized access: User ID not found");
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        let wishlist = await WishlistDB.findOne({ userId });
        console.log("Fetched wishlist from database:", wishlist);

        if (!wishlist) {
            console.log("No wishlist found. Creating a new one.");
            wishlist = new WishlistDB({ userId, items: [] });
        }

        const productExists = wishlist.items.some(item => item.productId.toString() === productId);
        console.log("Product exists in wishlist:", productExists);

        if (productExists) {
            console.log("Item already exists in wishlist");
            return res.status(400).json({ message: "Item already in wishlist" });
        }

        console.log("Adding item to wishlist...");
        wishlist.items.push({ productId });
        await wishlist.save();

        console.log("Wishlist updated successfully:", wishlist);
        return res.status(201).json({ message: "Item added to wishlist", wishlist });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user?.id;

    console.log("Received request to remove product from wishlist");
    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    if (!userId) {
        console.log("Unauthorized access: User ID not found");
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        let wishlist = await WishlistDB.findOne({ userId });
        console.log("Fetched wishlist from database:", wishlist);

        if (!wishlist) {
            console.log("No wishlist found for user.");
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const initialLength = wishlist.items.length;

        wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);

        if (wishlist.items.length === initialLength) {
            console.log("Item not found in wishlist.");
            return res.status(404).json({ message: "Item not found in wishlist" });
        }

        await wishlist.save();

        console.log("Wishlist updated successfully:", wishlist);
        return res.status(200).json({ message: "Item removed from wishlist", wishlist });
    } catch (error) {
        console.error("Error removing item from wishlist:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addToWishlist,removeFromWishlist };
