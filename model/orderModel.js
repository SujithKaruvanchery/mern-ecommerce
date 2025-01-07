const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
                name: String,
                quantity: Number,
                price: Number,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            default: "Pending",
            enum: ["Order Received", "Shipping Progress", "Out for Dispatch", "Delivered Successfully"],
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("Order", orderSchema);