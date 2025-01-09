const AdminDB = require('../model/adminModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token')

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

        res.status(201).json({ message: 'Admin created successfully' });

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

        res.status(200).json({ message: 'Successfully logged in.', data: admin });
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

        res.status(200).json({ message: 'Successfully logged out admin' });
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

        return res.status(200).json({ message: 'Admin authenticated successfully' });
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

module.exports = { registerAdmin, loginAdmin, adminProfile, logoutAdmin, checkAdmin, updateAdminProfile }
