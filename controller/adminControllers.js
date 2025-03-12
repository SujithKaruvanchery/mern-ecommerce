const AdminDB = require('../model/adminModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token')
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const SellerDB = require('../model/sellerModel')
const UserDB = require('../model/userModel')
const ProductDB = require('../model/productModel')
const OrderDB = require('../model/orderModel')

const registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const adminAlreadyExistWithEmail = await AdminDB.findOne({ email });

        if (adminAlreadyExistWithEmail) {
            return res.status(409).json({ error: 'Admin with this email already exists' });
        }

        const adminAlreadyExistWithMobile = await AdminDB.findOne({ mobile });

        if (adminAlreadyExistWithMobile) {
            return res.status(409).json({ error: 'Admin with this mobile number already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        const newAdmin = new AdminDB({
            name, email, password: hashedPassword, mobile, role
        });

        const savedAdmin = await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully', data: savedAdmin });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const admin = await AdminDB.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: 'No admin found with the provided details' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }

        if (!admin.isActive) {
            return res.status(400).json({ error: 'Admin profile is currently inactive' });
        }

        const token = generateToken(admin, "admin");

        res.cookie("admin_token", token);

        {
            const { password, ...adminWithoutPassword } = admin._doc
            res.status(200).json({ message: 'Successfully logged in.', data: adminWithoutPassword });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const adminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;

        const adminData = await AdminDB.findById(adminId).select('-password');

        if (!adminData) {
            return res.status(404).json({ error: 'Admin not found in the system.' });
        }

        if (!adminData.isActive) {
            return res.status(403).json({ error: 'The admin account is inactive.' });
        }

        res.status(200).json({
            message: 'Admin profile loaded successfully',
            data: adminData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const logoutAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await AdminDB.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found in the system.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'The admin account is inactive.' });
        }

        res.clearCookie("admin_token");

        res.status(200).json({ message: 'Successfully logged out admin', data: admin });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const checkAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await AdminDB.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found in the system.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'The admin account is inactive.' });
        }

        return res.status(200).json({ message: 'Admin authenticated successfully', data: admin });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;

        const { name, email, mobile } = req.body;

        if (!name && !email && !mobile) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        if (email) {
            const existingAdminWithEmail = await AdminDB.findOne({ email });
            if (existingAdminWithEmail && existingAdminWithEmail._id.toString() !== adminId) {
                return res.status(400).json({ error: 'This email is already registered.' });
            }
        }

        if (mobile) {
            const existingAdminWithMobile = await AdminDB.findOne({ mobile });
            if (existingAdminWithMobile && existingAdminWithMobile._id.toString() !== adminId) {
                return res.status(400).json({ error: 'This mobile number is already registered.' });
            }
        }

        const admin = await AdminDB.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found in the system.' });
        }

        if (name) admin.name = name;
        if (email) admin.email = email;
        if (mobile) admin.mobile = mobile;

        await admin.save();

        const updatedAdmin = await AdminDB.findById(adminId).select("-password");

        res.status(200).json({ message: 'Admin profile updated successfully', data: updatedAdmin });

    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await AdminDB.findByIdAndDelete(id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found in the system.' });
        }

        return res.status(200).json({ message: 'Successfully deleted the admin account', data: admin });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await AdminDB.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found with this email' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        admin.resetPasswordToken = resetToken;
        admin.resetPasswordExpires = Date.now() + 3600000;
        await admin.save();

        const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
            html: `Click <a href=${resetUrl}>here</a> to change your password.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'We have sent a link to your email to reset the password.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    console.log('Password:', password);

    try {
        const admin = await AdminDB.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        if (!password || password.trim() === '') {
            return res.status(400).json({ error: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        console.log('Generated Salt:', salt);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin.password = hashedPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;

        await admin.save();

        res.status(200).json({ message: 'Your password has been successfully updated.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await UserDB.countDocuments();
        console.log("Total Users:", totalUsers);

        const totalSellers = await SellerDB.countDocuments();
        console.log("Total Sellers:", totalSellers);

        const totalOrders = await OrderDB.countDocuments();
        console.log("Total Orders:", totalOrders);

        const totalCanceledOrders = await OrderDB.countDocuments({ orderStatus: "Canceled" });
        console.log("Total Canceled Orders:", totalCanceledOrders);

        const totalRevenue = await OrderDB.aggregate([
            { $match: { orderStatus: { $ne: "Canceled" } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        console.log("Total Revenue:", totalRevenue[0]?.total || 0);

        const monthlyOrders = await OrderDB.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }
        ]);
        console.log("Monthly Orders Data:", monthlyOrders);

        const orderData = monthlyOrders.map(item => ({
            name: new Date(0, item._id - 1).toLocaleString('default', { month: 'short' }),
            orders: item.orders,
        }));
        console.log("Formatted Monthly Orders:", orderData);

        res.json({
            totalUsers,
            totalSellers,
            totalOrders,
            totalCanceledOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            orderData,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};

module.exports = { registerAdmin, loginAdmin, adminProfile, logoutAdmin, checkAdmin, updateAdminProfile, forgotPassword, resetPassword, deleteAdmin,getDashboardStats }
