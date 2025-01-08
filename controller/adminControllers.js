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
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const admin = await AdminDB.findOne({ email });
        console.log(admin, "=======Admin Data");

        if (!admin) {
            return res.status(400).json({ error: 'No admin found with the provided details' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        console.log(passwordMatch, "========Password Match");

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }

        if (!admin.isActive) {
            return res.status(400).json({ error: 'Admin profile is currently inactive' });
        }

        const token = generateToken(admin, "admin");
        console.log(token, "=======Token");

        res.cookie("admin_token", token);

        res.status(200).json({ message: 'Successfully logged in.', data: admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error '});
    }
};

module.exports = {registerAdmin,loginAdmin}