const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);


