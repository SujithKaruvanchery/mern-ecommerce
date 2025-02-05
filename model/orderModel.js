// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users",  
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Products", 
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,  
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     orderStatus: {
//       type: String,
//       default: "Pending",
//       enum: [
//         "Order Received", 
//         "Shipping Progress", 
//         "Out for Dispatch", 
//         "Delivered Successfully"
//       ],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",  
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products", 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,  
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Order Received",
        "Verified by Admin",
        "Placed",
        "Shipping Progress",
        "Out for Dispatch",
        "Delivered Successfully",
      ],
    },
    verifiedByAdmin: {
      type: Boolean,
      default: false,
    },
    adminVerifiedAt: {
      type: Date,
      default: null,
    },
    orderPlaced: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

