const SellerDB = require('../model/sellerModel')
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token')
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const OrderDB = require('../model/orderModel')
const ProductDB = require('../model/productModel')

const registerSeller = async (req, res) => {
    try {
        const { name, email, mobile, password, storeName, address } = req.body;
        if (!name || !email || !mobile || !password || !storeName || !address) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const sellerAlreadyExistWithEmail = await SellerDB.findOne({ email });

        if (sellerAlreadyExistWithEmail) {
            return res.status(400).json({ error: 'Seller with this email already exists' });
        }

        const sellerAlreadyExistWithMobile = await SellerDB.findOne({ mobile });

        if (sellerAlreadyExistWithMobile) {
            return res.status(400).json({ error: 'Seller with this mobile number already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newSeller = new SellerDB({
            name, email, password: hashedPassword, mobile, storeName, address
        });

        const savedSeller = await newSeller.save();
        res.status(200).json({ message: 'Seller created successfully', data: savedSeller });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const seller = await SellerDB.findOne({ email });

        if (!seller) {
            return res.status(400).json({ error: 'No seller found with the provided details' });
        }

        const passwordMatch = await bcrypt.compare(password, seller.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }

        if (!seller.isActive) {
            return res.status(400).json({ error: 'Seller profile is currently inactive' });
        }

        const token = generateToken(seller, "seller");

        res.cookie("seller_token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        {
            const { password, ...sellerWithoutPassword } = seller._doc
            res.status(200).json({ message: 'Successfully logged in.', data: sellerWithoutPassword });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const sellerProfile = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const sellerData = await SellerDB.findById(sellerId).select('-password');

        if (!sellerData) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!sellerData.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }
        res.status(200).json({ message: 'Seller profile loaded successfully', data: sellerData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateSellerProfile = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { name, email, mobile, storeName, address } = req.body;

        if (!name && !email && !mobile && !storeName && !address) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (name) seller.name = name;
        if (email) {
            const existingSellerWithEmail = await SellerDB.findOne({ email });
            if (existingSellerWithEmail && existingSellerWithEmail._id.toString() !== sellerId) {
                return res.status(400).json({ error: 'This email is already registered.' });
            }
            seller.email = email;
        }
        if (mobile) {
            const existingSellerWithMobile = await SellerDB.findOne({ mobile });
            if (existingSellerWithMobile && existingSellerWithMobile._id.toString() !== sellerId) {
                return res.status(400).json({ error: 'This mobile number is already registered.' });
            }
            seller.mobile = mobile;
        }
        if (storeName) seller.storeName = storeName;
        if (address) seller.address = address;

        await seller.save();

        const updatedSeller = await SellerDB.findById(sellerId).select('-password');

        res.status(200).json({ message: 'Seller profile updated successfully', data: updatedSeller });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const checkSeller = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!seller.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }

        return res.status(200).json({ message: 'Seller authenticated successfully', data: seller });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const logoutSeller = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!seller.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }

        res.clearCookie('seller_token', {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.status(200).json({ message: 'Successfully logged out seller', data: seller });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await SellerDB.findByIdAndDelete(id);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found in the system.' });
        }

        return res.status(200).json({ message: 'Successfully deleted the seller account', data: seller });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllSellers = async (req, res) => {
    try {
        const users = await SellerDB.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};

const forgotPasswordSeller = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(422).json({ error: "Email is required." });
    }

    try {
        const seller = await SellerDB.findOne({ email });

        if (!seller) {
            return res.status(404).json({ error: "No seller found with this email." });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        seller.resetPasswordToken = resetToken;
        seller.resetPasswordExpires = Date.now() + 3600000;
        await seller.save();

        const resetUrl = `${process.env.FRONTEND_URL}/seller/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: email,
            subject: "Password Reset Request",
            html: `Click <a href="${resetUrl}">here</a> to reset your password. The link expires in 1 hour.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "A password reset link has been sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const resetPasswordSeller = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const seller = await SellerDB.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!seller) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ error: "Password is required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        seller.password = hashedPassword;
        seller.resetPasswordToken = undefined;
        seller.resetPasswordExpires = undefined;

        await seller.save();
        res.status(200).json({ message: "Your password has been successfully updated." });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSellerDashboardStats = async (req, res) => {
    try {
        const sellerId = req.user.id;
        console.log("Seller ID:", sellerId);

        const sellerProducts = await ProductDB.find({ seller: sellerId }).select("_id");
        const productIds = sellerProducts.map((product) => product._id);
        console.log("Product IDs:", productIds);

        const totalProducts = sellerProducts.length;
        console.log("Total Products:", totalProducts);

        const totalOrders = await OrderDB.countDocuments({ "items.productId": { $in: productIds } });
        console.log("Total Orders:", totalOrders);

        const totalCanceledOrders = await OrderDB.countDocuments({
            "items.productId": { $in: productIds },
            orderStatus: "Canceled"
        });
        console.log("Total Canceled Orders:", totalCanceledOrders);

        const totalRevenue = await OrderDB.aggregate([
            { $unwind: "$items" },
            {
                $match: {
                    "items.productId": { $in: productIds },
                    orderStatus: { $ne: "Canceled" }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
                }
            }
        ]);
        console.log("Total Revenue:", totalRevenue[0]?.total || 0);

        const monthlyOrders = await OrderDB.aggregate([
            { $match: { "items.productId": { $in: productIds } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }
        ]);
        console.log("Monthly Orders:", monthlyOrders);

        const orderData = monthlyOrders.map(item => ({
            name: new Date(0, item._id - 1).toLocaleString('default', { month: 'short' }),
            orders: item.orders,
        }));
        console.log("Formatted Order Data:", orderData);

        res.json({
            totalProducts,
            totalOrders,
            totalCanceledOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            orderData,
        });
    } catch (error) {
        console.error("Error fetching seller dashboard stats:", error);
        res.status(500).json({ error: 'Failed to fetch seller dashboard stats' });
    }
};

const getSellerProducts = async (req, res) => {
    try {
        console.log("Fetching products for seller:", req.user.id);

        const sellerId = req.user.id;
        const products = await ProductDB.find({ seller: sellerId });

        if (!products.length) {
            console.log("No products found for seller:", sellerId);
            return res.status(404).json({ message: 'No products found for this seller' });
        }

        console.log("Products fetched successfully for seller:", sellerId);
        res.status(200).json({
            message: 'Seller products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error("Error fetching seller products:", error.message);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { registerSeller, loginSeller, sellerProfile, updateSellerProfile, checkSeller, logoutSeller, deleteSeller, getAllSellers, forgotPasswordSeller, resetPasswordSeller, getSellerDashboardStats, getSellerProducts }
