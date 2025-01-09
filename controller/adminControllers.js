const AdminDB = require('../model/adminModel')
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/token')

const registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' }); // 400: Bad Request
        }

        const adminAlreadyExistWithEmail = await AdminDB.findOne({ email });

        if (adminAlreadyExistWithEmail) {
            return res.status(409).json({ error: 'Admin with this email already exists' }); // 409: Conflict
        }

        const adminAlreadyExistWithMobile = await AdminDB.findOne({ mobile });

        if (adminAlreadyExistWithMobile) {
            return res.status(409).json({ error: 'Admin with this mobile number already exists' }); // 409: Conflict
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        const newAdmin = new AdminDB({
            name, email, password: hashedPassword, mobile, role
        });

        const savedAdmin = await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' }); // 201: Created

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' }); // 400: Bad Request
        }

        const admin = await AdminDB.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: 'No admin found with the provided details' }); // 400: Bad Request
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect' }); // 400: Bad Request
        }

        if (!admin.isActive) {
            return res.status(400).json({ error: 'Admin profile is currently inactive' }); // 400: Bad Request
        }

        const token = generateToken(admin, "admin");

        res.cookie("admin_token", token);

        res.status(200).json({ message: 'Successfully logged in.', data: admin }); // 200: OK
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const adminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;

        const adminData = await AdminDB.findById(adminId).select('-password');

        if (!adminData) {
            return res.status(404).json({ error: 'Admin not found in the system.' }); // 404: Not Found
        }

        if (!adminData.isActive) {
            return res.status(403).json({ error: 'The admin account is inactive.' }); // 403: Forbidden
        }

        res.status(200).json({ 
            message: 'Admin profile loaded successfully', 
            data: adminData 
        }); // 200: OK
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const logoutAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await AdminDB.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found in the system.' }); // 404: Not Found
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'The admin account is inactive.' }); // 403: Forbidden
        }

        res.clearCookie("admin_token");

        res.status(200).json({ message: 'Successfully logged out admin' }); // 200: OK
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};




module.exports = {registerAdmin,loginAdmin,adminProfile,logoutAdmin}